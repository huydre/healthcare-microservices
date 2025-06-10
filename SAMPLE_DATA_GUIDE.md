# 🏥 Healthcare Microservices - Sample Data Guide

## 📋 Tổng Quan

Hướng dẫn này giải thích cách tạo và sử dụng dữ liệu mẫu cho hệ thống Healthcare Microservices.

## 🚀 Cách Tạo Dữ Liệu Mẫu

### Phương Pháp 1: Script Tự Động (Khuyến nghị)

```bash
# Chạy script tạo dữ liệu mẫu
./create_sample_data.sh
```

Script này sẽ:
- ✅ Kiểm tra và khởi động Docker services
- 👥 Tạo users (doctors, patients, nurses, pharmacists, admin)
- 📅 Tạo lịch làm việc và appointments
- 🏥 Tạo medical records
- 💊 Tạo prescriptions (nếu có)
- 🧪 Tạo lab tests (nếu có)

### Phương Pháp 2: Manual Commands

```bash
# 1. Tạo users
cd user_service
python manage.py create_sample_users --doctors=15 --patients=100 --clear

# 2. Tạo appointments  
cd ../appointment_service
python manage.py create_sample_appointments --days=60 --appointments=200 --clear

# 3. Tạo medical records
cd ../clinical_service  
python manage.py create_sample_records --records=150 --clear
```

### Phương Pháp 3: Docker Auto-Init

Dữ liệu mẫu sẽ được tự động tạo khi containers khởi động lần đầu thông qua `init_sample_data.sh`.

## 👥 Dữ Liệu Mẫu Được Tạo

### 🔐 Tài Khoản Đăng Nhập

| Vai Trò | Username | Password | Số Lượng |
|---------|----------|----------|-----------|
| **Admin** | `admin` | `admin123` | 1 |
| **Bác Sĩ** | `doctor01` - `doctor15` | `doctor123` | 15 |
| **Bệnh Nhân** | `patient001` - `patient100` | `patient123` | 100 |
| **Y Tá** | `nurse01` - `nurse05` | `nurse123` | 5 |
| **Dược Sĩ** | `pharmacist01` - `pharmacist03` | `pharmacist123` | 3 |

### 👨‍⚕️ Bác Sĩ Mẫu

- **Chuyên Khoa**: Tim mạch, Thần kinh, Nhi khoa, Phụ sản, Ung bướu, etc.
- **Thông Tin**: Kinh nghiệm 5-25 năm, giấy phép hành nghề
- **Lịch Làm Việc**: Thứ 2-6 (8:00-12:00, 14:00-17:00), Thứ 7 (8:00-12:00)

### 👥 Bệnh Nhân Mẫu

- **Độ Tuổi**: 20-80 tuổi
- **Thông Tin Y Tế**: Nhóm máu, dị ứng, bệnh nền
- **Bảo Hiểm**: BHXH, Bảo Việt, Prudential, AIA, PVI
- **Địa Chỉ**: Các tỉnh thành lớn (Hà Nội, TP.HCM, Đà Nẵng, etc.)

### 📅 Lịch Khám Mẫu

- **Số Lượng**: ~200 appointments
- **Thời Gian**: 60 ngày tới
- **Trạng Thái**: PENDING, CONFIRMED, COMPLETED
- **Lý Do Khám**: Khám tổng quát, đau đầu, kiểm tra định kỳ, etc.

### 🏥 Hồ Sơ Y Tế Mẫu

- **Số Lượng**: ~150 records
- **Chẩn Đoán**: Cảm cúm, viêm họng, cao huyết áp, tiểu đường, etc.
- **Điều Trị**: Thuốc, nghỉ ngơi, tái khám, etc.
- **Thời Gian**: 6 tháng qua

## 🧪 Test Data cho Chatbot

### Câu Hỏi Mẫu

```
# Triệu chứng
"Tôi bị đau đầu"
"Em bị sốt và ho"
"Tôi cảm thấy mệt mỏi"

# Đặt lịch khám
"Tôi muốn đặt lịch khám"
"Đặt lịch với bác sĩ tim mạch"
"Khi nào có thể khám được?"

# Hỏi thông tin
"Bác sĩ nào chuyên về tim mạch?"
"Giờ làm việc của bệnh viện?"
"Cách đặt lịch khám như thế nào?"
```

### Test Accounts cho Chatbot

```bash
# Login với token
POST /api/auth/login/
{
  "username": "patient001",
  "password": "patient123"
}

# Chat với token
POST /api/chatbot/respond/
Headers: Authorization: Bearer <token>
{
  "message": "Tôi muốn đặt lịch khám",
  "session_id": null
}
```

## 🔧 Customization

### Thay Đổi Số Lượng Dữ Liệu

```bash
# Tạo nhiều bác sĩ hơn
python manage.py create_sample_users --doctors=25 --patients=200

# Tạo nhiều appointments hơn
python manage.py create_sample_appointments --days=90 --appointments=500

# Tạo nhiều medical records hơn
python manage.py create_sample_records --records=300
```

### Xóa Dữ Liệu Cũ

```bash
# Xóa tất cả và tạo mới
python manage.py create_sample_users --clear
python manage.py create_sample_appointments --clear
python manage.py create_sample_records --clear
```

## 🗄️ Database Schema

### User Service (SQLite: user_service/db.sqlite3)

```sql
-- Main tables
users_user                 -- Thông tin user cơ bản
users_patientprofile       -- Hồ sơ bệnh nhân
users_doctorprofile        -- Hồ sơ bác sĩ
users_nurseprofile         -- Hồ sơ y tá
users_pharmacistprofile    -- Hồ sơ dược sĩ
users_adminprofile         -- Hồ sơ admin
```

### Appointment Service (SQLite: appointment_service/db.sqlite3)

```sql
-- Main tables  
appointments_doctorschedule    -- Lịch làm việc bác sĩ
appointments_appointmentslot   -- Khung giờ khám
appointments_appointment       -- Lịch khám bệnh
```

### Clinical Service (SQLite: clinical_service/db.sqlite3)

```sql
-- Main tables
records_medicalrecord         -- Hồ sơ y tế
```

## 🔍 Truy Vấn Dữ Liệu Mẫu

### Xem Danh Sách Bác Sĩ

```bash
# API call
curl http://localhost:8001/api/users/api/doctors/

# Django shell
python manage.py shell
>>> from users.models import User
>>> doctors = User.objects.filter(role='DOCTOR')
>>> for doc in doctors: print(f"{doc.username}: {doc.first_name} {doc.last_name}")
```

### Xem Lịch Khám

```bash
# API call  
curl http://localhost:8002/api/appointments/

# Django shell
python manage.py shell
>>> from appointments.models import Appointment
>>> apps = Appointment.objects.all()[:10]
>>> for app in apps: print(f"{app.patient_name} -> {app.doctor_name} @ {app.scheduled_time}")
```

## 🚨 Troubleshooting

### Lỗi Thường Gặp

1. **"No module named 'users'"**
   ```bash
   # Đảm bảo đang ở đúng thư mục service
   cd user_service
   python manage.py create_sample_users
   ```

2. **"Connection refused"**
   ```bash
   # Khởi động Docker services trước
   docker-compose up -d
   # Đợi services khởi động rồi chạy script
   ```

3. **"IntegrityError: UNIQUE constraint failed"**
   ```bash
   # Xóa dữ liệu cũ trước khi tạo mới
   python manage.py create_sample_users --clear
   ```

### Reset Hoàn Toàn

```bash
# Xóa tất cả containers và volumes
docker-compose down -v

# Xóa database files
rm */db.sqlite3

# Khởi động lại và tạo dữ liệu mới
docker-compose up -d
./create_sample_data.sh
```

## 📞 Hỗ Trợ

Nếu gặp vấn đề khi tạo dữ liệu mẫu:

1. Kiểm tra logs: `docker-compose logs service_name`
2. Kiểm tra database connection
3. Đảm bảo tất cả services đang chạy
4. Thử reset hoàn toàn nếu cần thiết

---

**✅ Sau khi có dữ liệu mẫu, bạn có thể test đầy đủ các tính năng của hệ thống Healthcare Microservices!** 🏥🚀
