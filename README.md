# Hệ Thống Y Tế Microservices

Hệ thống quản lý y tế toàn diện, tích hợp AI được xây dựng trên kiến trúc microservices, được thiết kế để tối ưu hóa các hoạt động chăm sóc sức khỏe cho bệnh nhân, bác sĩ, y tá, dược sĩ và quản trị viên.

## 🏥 Tổng Quan

Nền tảng y tế này cung cấp một hệ sinh thái chăm sóc sức khỏe số hoàn chỉnh với các tính năng AI tiên tiến, bao gồm chatbot thông minh, trợ lý chẩn đoán ảo và quản lý hồ sơ y tế toàn diện. Hệ thống được xây dựng bằng kiến trúc microservices hiện đại với Docker container hóa để đảm bảo khả năng mở rộng và bảo trì.

## 🚀 Tính Năng Chính

### 🤖 Y Tế Tích Hợp AI
- **Chatbot Thông Minh**: AI đối thoại được trang bị TensorFlow hỗ trợ bệnh nhân
- **Robot Chẩn Đoán Ảo**: Đánh giá sức khỏe sơ bộ bằng AI
- **AI Giải Thích được (LIME)**: Ra quyết định AI minh bạch với lời giải thích

### 👥 Hỗ Trợ Đa Vai Trò
- **Bệnh Nhân**: Đặt lịch khám, truy cập hồ sơ y tế, quản lý đơn thuốc
- **Bác Sĩ**: Quản lý bệnh nhân, công cụ chẩn đoán, lập lịch hẹn
- **Y Tá**: Phối hợp chăm sóc bệnh nhân, cập nhật hồ sơ y tế
- **Dược Sĩ**: Quản lý đơn thuốc, theo dõi tồn kho
- **Quản Trị Viên**: Giám sát hệ thống, quản lý người dùng, phân tích

### 🏗️ Các Module Y Tế Cốt Lõi
- **Quản Lý Người Dùng**: Xác thực an toàn với JWT và kiểm soát truy cập theo vai trò
- **Hệ Thống Đặt Lịch**: Lập lịch và quản lý toàn diện
- **Hồ Sơ Lâm Sàng**: Hồ sơ sức khỏe điện tử (EHR) hoàn chỉnh
- **Quản Lý Nhà Thuốc**: Theo dõi đơn thuốc và tồn kho
- **Dịch Vụ Xét Nghiệm**: Đặt hàng xét nghiệm và quản lý kết quả
- **Tích Hợp Bảo Hiểm**: Xử lý yêu cầu và xác minh bảo hiểm
- **Thông Báo Thời Gian Thực**: Hệ thống giao tiếp đa kênh

## 🏛️ Kiến Trúc

### Tổng Quan Microservices

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │    │     Gateway      │    │  Dịch Vụ        │
│   (React)       │◄──►│    (Django)      │◄──►│  Thông Báo      │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │
                ┌───────────────┼───────────────┐
                │               │               │
        ┌───────▼─────┐ ┌──────▼──────┐ ┌─────▼─────┐
        │Dịch Vụ      │ │Dịch Vụ      │ │ Dịch Vụ   │
        │Người Dùng   │ │Đặt Lịch     │ │ Lâm Sàng  │
        └─────────────┘ └─────────────┘ └───────────┘
                │               │               │
        ┌───────▼─────┐ ┌──────▼──────┐ ┌─────▼─────┐
        │ Dịch Vụ     │ │Dịch Vụ      │ │Dịch Vụ    │
        │ Nhà Thuốc   │ │Xét Nghiệm   │ │Bảo Hiểm   │
        └─────────────┘ └─────────────┘ └───────────┘
                │               │
        ┌───────▼─────┐ ┌──────▼──────┐
        │Robot Ảo     │ │  Chatbot    │
        │             │ │             │
        └─────────────┘ └─────────────┘
```

### Ngăn Xếp Công Nghệ

#### Backend
- **Framework**: Django REST Framework
- **Xác Thực**: JWT (JSON Web Tokens)
- **Cơ Sở Dữ Liệu**: PostgreSQL (cấu hình sẵn sàng production)
- **API Gateway**: Định tuyến tùy chỉnh dựa trên Django
- **Container hóa**: Docker & Docker Compose

#### Frontend
- **Framework**: React 18 với Vite
- **Styling**: Tailwind CSS
- **UI Components**: Lucide React icons
- **Build Tool**: Vite cho phát triển nhanh

#### Thành Phần AI/ML
- **Machine Learning**: TensorFlow & Scikit-learn
- **AI Giải Thích được**: LIME (Local Interpretable Model-agnostic Explanations)
- **Xử Lý Dữ Liệu**: Pandas & NumPy
- **Trực Quan Hóa**: Matplotlib & Seaborn

## 🛠️ Cài Đặt & Thiết Lập

### Yêu Cầu Hệ Thống
- Docker & Docker Compose
- Node.js 18+ (cho phát triển frontend)
- Python 3.9+ (cho phát triển backend)

### Khởi Chạy Nhanh

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd healthcare-microservices
   ```

2. **Thiết lập môi trường**
   ```bash
   # Sao chép file môi trường
   cp gateway/.env.example gateway/.env
   # Cập nhật thông tin database và JWT secrets trong file .env
   ```

3. **Build và chạy với Docker**
   ```bash
   docker-compose up --build -d
   ```

4. **Truy cập ứng dụng**
   - Frontend: http://localhost:3000
   - API Gateway: http://localhost:8000
   - Các dịch vụ riêng lẻ: Cổng 8001-8009

### Thiết Lập Phát Triển

#### Phát Triển Backend
```bash
# Cài đặt dependencies Python cho từng service
cd user_service
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 8001

# Lặp lại cho các service khác (cổng 8002-8009)
```

#### Phát Triển Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📋 Tài Liệu API

### Xác Thực
Tất cả API endpoints đều yêu cầu xác thực JWT (trừ đăng ký/đăng nhập):

```bash
# Đăng nhập
POST /api/auth/login/
{
  "username": "user@example.com",
  "password": "password"
}

# Phản hồi
{
  "access": "jwt_token_here",
  "refresh": "refresh_token_here",
  "user": {...}
}
```

### Các Endpoint Chính

#### Quản Lý Người Dùng
- `POST /api/users/register/` - Đăng ký người dùng
- `GET /api/users/profile/` - Lấy thông tin hồ sơ
- `PUT /api/users/profile/` - Cập nhật hồ sơ

#### Lịch Hẹn
- `GET /api/appointments/` - Danh sách lịch hẹn
- `POST /api/appointments/` - Tạo lịch hẹn
- `PUT /api/appointments/{id}/` - Cập nhật lịch hẹn
- `DELETE /api/appointments/{id}/` - Hủy lịch hẹn

#### Hồ Sơ Y Tế
- `GET /api/clinical/records/` - Lấy hồ sơ y tế
- `POST /api/clinical/records/` - Tạo hồ sơ
- `GET /api/clinical/records/{id}/` - Lấy hồ sơ cụ thể

#### Dịch Vụ AI
- `POST /api/chatbot/chat/` - Chat với trợ lý AI
- `POST /api/virtual-robot/diagnose/` - Đánh giá chẩn đoán ảo

## 🔒 Tính Năng Bảo Mật

- **Xác Thực JWT**: Xác thực an toàn dựa trên token
- **Kiểm Soát Truy Cập Theo Vai Trò**: Quyền hạn chi tiết cho từng loại người dùng
- **Cấu Hình CORS**: Chia sẻ tài nguyên cross-origin an toàn
- **Biến Môi Trường**: Bảo vệ dữ liệu nhạy cảm
- **Bảo Mật Database**: Kết nối mã hóa và truy vấn an toàn

## 🧪 Tính Năng AI/ML

### Trí Tuệ Chatbot
Chatbot y tế sử dụng mô hình TensorFlow được đào tạo trên bộ dữ liệu y tế để:
- Trả lời các câu hỏi sức khỏe thường gặp
- Cung cấp thông tin về thuốc
- Hướng dẫn người dùng đánh giá triệu chứng
- Cung cấp nội dung giáo dục sức khỏe

### Robot Chẩn Đoán Ảo
Hệ thống AI tiên tiến có thể:
- Thực hiện đánh giá sức khỏe sơ bộ
- Phân tích triệu chứng bằng machine learning
- Cung cấp quyết định AI có thể giải thích được bằng LIME
- Đưa ra khuyến nghị chăm sóc

### Đào Tạo Mô Hình
Notebook `Chat.ipynb` chứa:
- Pipeline tiền xử lý dữ liệu
- Quy trình đào tạo mô hình
- Tích hợp khả năng giải thích LIME
- Các chỉ số đánh giá hiệu suất

## 🗄️ Lược Đồ Cơ Sở Dữ Liệu

### Hồ Sơ Người Dùng
- **PatientProfile**: Lịch sử y tế, dị ứng, liên hệ khẩn cấp
- **DoctorProfile**: Chuyên khoa, thông tin giấy phép, lịch làm việc
- **NurseProfile**: Chứng chỉ, phòng ban được phân công
- **PharmacistProfile**: Chi tiết giấy phép, phân công nhà thuốc
- **AdminProfile**: Quyền hệ thống, phạm vi quản lý

### Dữ Liệu Y Tế
- **MedicalRecord**: Hồ sơ sức khỏe toàn diện
- **Prescription**: Đơn thuốc và lịch sử
- **LabTest**: Kết quả xét nghiệm
- **Appointment**: Theo dõi lịch hẹn và trạng thái
- **InsuranceClaim**: Thông tin bảo hiểm và thanh toán

## 🐳 Dịch Vụ Docker

| Dịch Vụ | Cổng | Mô Tả |
|---------|------|-------|
| gateway | 8000 | API Gateway & Định tuyến |
| user_service | 8001 | Quản lý người dùng & hồ sơ |
| appointment_service | 8002 | Lập lịch hẹn |
| clinical_service | 8003 | Hồ sơ y tế & dữ liệu lâm sàng |
| pharmacy_service | 8004 | Quản lý đơn thuốc |
| lab_service | 8005 | Xét nghiệm & kết quả |
| insurance_service | 8006 | Yêu cầu bảo hiểm & bảo hiểm |
| notification_service | 8007 | Thông báo đa kênh |
| virtualrobot_service | 8008 | Hỗ trợ chẩn đoán AI |
| chatbot_service | 8009 | AI đối thoại |
| frontend | 3000 | Giao diện React |

## 🧭 Ví Dụ Sử Dụng

### Hành Trình Bệnh Nhân
1. **Đăng Ký**: Tạo tài khoản với lựa chọn vai trò
2. **Thiết Lập Hồ Sơ**: Hoàn thành lịch sử y tế và sở thích
3. **Đặt Lịch Hẹn**: Lập lịch với bác sĩ có sẵn
4. **Tư Vấn AI**: Sử dụng chatbot cho câu hỏi sơ bộ
5. **Đánh Giá Ảo**: Nhận đánh giá sức khỏe bằng AI
6. **Hồ Sơ Y Tế**: Truy cập lịch sử sức khỏe hoàn chỉnh
7. **Quản Lý Đơn Thuốc**: Theo dõi thuốc và tái cấp

### Quy Trình Nhà Cung Cấp Dịch Vụ Y Tế
1. **Truy Cập Dashboard**: Giao diện theo vai trò cụ thể
2. **Quản Lý Bệnh Nhân**: Xem bệnh nhân được phân công
3. **Xử Lý Lịch Hẹn**: Quản lý lịch trình và tình trạng sẵn sàng
4. **Tài Liệu Lâm Sàng**: Cập nhật hồ sơ y tế
5. **Hỗ Trợ AI**: Tận dụng công cụ chẩn đoán
6. **Giao Tiếp**: Phối hợp với các nhà cung cấp khác

## 🤝 Đóng Góp

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/tinh-nang-tuyet-voi`)
3. Commit thay đổi (`git commit -m 'Thêm tính năng tuyệt vời'`)
4. Push lên branch (`git push origin feature/tinh-nang-tuyet-voi`)
5. Mở Pull Request

## 📄 Giấy Phép

Dự án này được cấp phép theo Giấy phép MIT - xem file [LICENSE](LICENSE) để biết chi tiết.

## 🆘 Hỗ Trợ

Để được hỗ trợ và câu hỏi:
- Tạo issue trên GitHub
- Liên hệ nhóm phát triển
- Kiểm tra wiki tài liệu

---

**Được xây dựng với ❤️ để cung cấp dịch vụ chăm sóc sức khỏe tốt hơn**
