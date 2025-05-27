import os
import json
import numpy as np
import tensorflow as tf
import re
from lime.lime_tabular import LimeTabularExplainer
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

BASE_DIR = os.path.dirname(__file__)
MODEL_DIR = os.path.join(BASE_DIR, "model")

# Load model
try:
    model_path = os.path.join(MODEL_DIR, "chatbot_model.h5")
    chatbot_model = tf.keras.models.load_model(model_path)
    logger.info(f"Loaded model from {model_path}")
except Exception as e:
    logger.error(f"Error loading model: {str(e)}")
    chatbot_model = None

# Load symptom names and disease names
try:
    with open(os.path.join(MODEL_DIR, "symptom_names.json"), "r") as f:
        symptom_names_expanded = json.load(f)
    
    with open(os.path.join(MODEL_DIR, "disease_names.json"), "r") as f:
        diseases_expanded = json.load(f)
    
    with open(os.path.join(MODEL_DIR, "symptom_synonyms.json"), "r") as f:
        symptom_synonyms = json.load(f)
    
    with open(os.path.join(MODEL_DIR, "level_map.json"), "r") as f:
        level_map = json.load(f)
    
    logger.info("Loaded symptom and disease metadata")
except Exception as e:
    logger.error(f"Error loading metadata: {str(e)}")
    symptom_names_expanded = []
    diseases_expanded = []
    symptom_synonyms = {}
    level_map = {}

# Lưu trạng thái chat để theo dõi cuộc trò chuyện
chat_sessions = {}

def parse_symptoms_from_text(text, current_symptoms_vector):
    """
    Phân tích văn bản đầu vào để trích xuất triệu chứng và mức độ.
    Cập nhật current_symptoms_vector.
    Trả về True nếu có ít nhất một triệu chứng được nhận diện, False nếu không.
    """
    text = text.lower()
    symptoms_found_in_input = False

    # Ưu tiên các cụm (mức độ + triệu chứng) hoặc (triệu chứng + mức độ)
    for level_word, level_val in level_map.items():
        for syn_word, symptom_name in symptom_synonyms.items():
            # Pattern: level_word + syn_word (e.g., "sốt cao", "ho nhẹ")
            pattern1 = rf"\b{level_word}\s+{syn_word}\b"
            # Pattern: syn_word + level_word (e.g., "sốt cao", "ho nhẹ")
            pattern2 = rf"\b{syn_word}\s+{level_word}\b"
            
            if re.search(pattern1, text) or re.search(pattern2, text):
                if symptom_name in symptom_names_expanded:
                    idx = symptom_names_expanded.index(symptom_name)
                    current_symptoms_vector[idx] = float(level_val)
                    symptoms_found_in_input = True
                    # Loại bỏ cụm đã xử lý để tránh xử lý lại
                    text = re.sub(pattern1, "", text)
                    text = re.sub(pattern2, "", text)

    # Xử lý các triệu chứng đứng một mình (mặc định mức độ là 2 - "vừa" hoặc "có")
    for syn_word, symptom_name in symptom_synonyms.items():
        pattern = rf"\b{syn_word}\b"
        if re.search(pattern, text):
            if symptom_name in symptom_names_expanded:
                idx = symptom_names_expanded.index(symptom_name)
                # Nếu triệu chứng này chưa được gán mức độ từ cụm (level + symptom), gán mặc định
                if current_symptoms_vector[idx] == 0: # Chỉ gán nếu chưa có
                     current_symptoms_vector[idx] = 2.0 # Mặc định là "vừa"
                symptoms_found_in_input = True

    return symptoms_found_in_input

def get_missing_symptoms_questions(symptoms_vector):
    """Tạo câu hỏi cho các triệu chứng chưa được cung cấp (giá trị là 0)."""
    questions = []
    for i, symptom_name in enumerate(symptom_names_expanded):
        if symptoms_vector[i] == 0: # Chỉ hỏi nếu chưa có thông tin
             # Đơn giản hóa câu hỏi
            if symptom_name == "Fever": questions.append(f"Bạn có bị sốt không (không/nhẹ/vừa/nặng)?")
            elif symptom_name == "Cough": questions.append(f"Bạn có ho không (không/nhẹ/vừa/nặng)?")
            elif symptom_name == "Sore Throat": questions.append(f"Bạn có đau họng không (không/nhẹ/vừa/nặng)?")
            # ... thêm các câu hỏi thân thiện hơn cho các triệu chứng khác
            else:
                questions.append(f"Bạn có bị {symptom_name.lower()} không (không/nhẹ/vừa/nặng)?")
    # Chỉ hỏi một vài triệu chứng mỗi lần để không làm người dùng quá tải
    return questions[:3] # Hỏi tối đa 3 triệu chứng còn thiếu

def get_or_create_user_session(user_id):
    """Lấy hoặc tạo mới session cho user"""
    if user_id not in chat_sessions:
        chat_sessions[user_id] = {
            'symptoms': np.zeros(len(symptom_names_expanded), dtype=np.float32),
            'asked_symptoms': set(),
            'state': 'collecting_symptoms',  # collecting_symptoms, diagnosing, done
            'last_message': None
        }
    return chat_sessions[user_id]

def prepare_lime_explainer():
    """Chuẩn bị LIME explainer"""
    # Tạo dữ liệu huấn luyện giả cho LIME
    # Điều này nên được thay thế bằng dữ liệu thực tế từ mô hình đã huấn luyện
    X_train_dummy = np.random.rand(100, len(symptom_names_expanded))
    return LimeTabularExplainer(
        X_train_dummy,
        feature_names=symptom_names_expanded,
        class_names=diseases_expanded,
        mode='classification'
    )

def predict_response(message, user_id="anonymous"):
    """Xử lý tin nhắn đầu vào và trả về phản hồi"""
    session = get_or_create_user_session(user_id)
    
    if message.lower() in ['reset', 'bắt đầu lại', 'bat dau lai']:
        session['symptoms'] = np.zeros(len(symptom_names_expanded), dtype=np.float32)
        session['asked_symptoms'].clear()
        session['state'] = 'collecting_symptoms'
        return "Xin chào! Tôi là chatbot chẩn đoán sức khỏe. Hãy mô tả các triệu chứng của bạn."
    
    if message.lower() in ['thoát', 'exit', 'quit']:
        session['state'] = 'done'
        return "Cảm ơn bạn đã sử dụng dịch vụ. Tạm biệt!"
    
    if session['state'] == 'collecting_symptoms':
        symptoms_identified = parse_symptoms_from_text(message, session['symptoms'])
        
        if message.lower() in ['xong', 'chẩn đoán', 'chan doan', 'ok', 'xem kết quả']:
            if not np.any(session['symptoms'] > 0):
                return "Tôi chưa nhận được thông tin triệu chứng nào. Bạn có thể mô tả lại được không?"
            
            session['state'] = 'diagnosing'
            return diagnose_symptoms(session)
        
        if symptoms_identified:
            response = "Tôi đã ghi nhận các triệu chứng bạn vừa cung cấp.\n"
            response += "Triệu chứng hiện tại:\n"
            
            has_symptom = False
            for i, val in enumerate(session['symptoms']):
                if val > 0:
                    response += f"- {symptom_names_expanded[i]}: mức độ {int(val)}\n"
                    has_symptom = True
            
            if not has_symptom:
                response += "(Chưa có triệu chứng nào được ghi nhận rõ ràng)\n"
            
            missing_questions = get_missing_symptoms_questions(session['symptoms'])
            if missing_questions:
                response += "\nĐể có chẩn đoán chính xác hơn, bạn có thể cho tôi biết thêm về:\n"
                for q in missing_questions[:2]:  # Chỉ hỏi 2 câu mỗi lần
                    response += f"- {q}\n"
            
            response += "\nHoặc bạn có thể nói 'xong' để chẩn đoán với thông tin hiện tại."
            return response
        else:
            return "Xin lỗi, tôi chưa hiểu rõ. Bạn có thể mô tả lại triệu chứng bằng các từ như 'sốt', 'ho', 'đau đầu', kèm theo mức độ (nhẹ, vừa, nặng) được không?"
    
    elif session['state'] == 'diagnosing':
        session['state'] = 'collecting_symptoms'
        session['symptoms'] = np.zeros(len(symptom_names_expanded), dtype=np.float32)
        session['asked_symptoms'].clear()
        
        if message.lower() in ['có', 'co', 'yes']:
            return "Hãy mô tả các triệu chứng mới."
        elif message.lower() in ['không', 'khong', 'no']:
            session['state'] = 'done'
            return "Cảm ơn bạn đã sử dụng dịch vụ. Tạm biệt!"
        else:
            parse_symptoms_from_text(message, session['symptoms'])
            if np.any(session['symptoms'] > 0):
                return "Tôi đã ghi nhận các triệu chứng mới. Bạn có thể cung cấp thêm hoặc gõ 'xong' để chẩn đoán."
            else:
                return "Hãy mô tả các triệu chứng của bạn hoặc gõ 'thoát' để kết thúc."
    
    return "Xin lỗi, tôi không hiểu yêu cầu. Bạn có thể mô tả lại không?"

def diagnose_symptoms(session):
    """Chẩn đoán dựa trên triệu chứng đã thu thập"""
    if chatbot_model is None:
        return "Xin lỗi, hệ thống chẩn đoán hiện không khả dụng."
    
    response = "Dựa trên các triệu chứng bạn cung cấp:\n"
    for i, val in enumerate(session['symptoms']):
        if val > 0:
            response += f"- {symptom_names_expanded[i]}: mức độ {int(val)}\n"
    
    # Dự đoán
    patient_vector = session['symptoms'].reshape(1, -1)
    probabilities = chatbot_model.predict(patient_vector, verbose=0)[0]
    
    response += "\n--- Kết quả chẩn đoán ---\n"
    sorted_indices = np.argsort(probabilities)[::-1]
    for i in range(min(3, len(diseases_expanded))):
        idx = sorted_indices[i]
        response += f"- {diseases_expanded[idx]}: {probabilities[idx]*100:.2f}%\n"
    
    primary_diagnosis_idx = sorted_indices[0]
    primary_diagnosis_name = diseases_expanded[primary_diagnosis_idx]
    response += f"\nChẩn đoán chính có khả năng cao nhất: {primary_diagnosis_name}\n"
    
    # Giả lập phân tích LIME (trong môi trường thực, bạn sẽ sử dụng LIME thực tế)
    response += f"\n--- Giải thích cho chẩn đoán {primary_diagnosis_name} ---\n"
    # Xác định các triệu chứng nổi bật nhất
    top_symptoms = []
    for i, val in enumerate(session['symptoms']):
        if val > 0:
            top_symptoms.append((symptom_names_expanded[i], val))
    
    top_symptoms.sort(key=lambda x: x[1], reverse=True)
    for symptom, val in top_symptoms[:3]:
        response += f"- Triệu chứng '{symptom}' ở mức {int(val)} góp phần vào chẩn đoán này\n"
    
    response += "\nBạn có muốn chẩn đoán cho một bộ triệu chứng khác không? (gõ 'có' hoặc mô tả triệu chứng mới, 'không' để thoát)"
    return response