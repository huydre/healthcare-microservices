-- Healthcare Microservices Sample Data SQL
-- Quick sample data insertion for development

-- Note: This is a simplified version for quick setup
-- Run the Django management commands for full featured sample data

-- Sample Users (simplified)
INSERT INTO users_user (id, username, email, first_name, last_name, role, is_verified, password, date_joined, last_updated, is_active, is_staff, is_superuser) VALUES
(1, 'admin', 'admin@healthcare.com', 'System', 'Administrator', 'ADMIN', 1, 'pbkdf2_sha256$600000$admin123', datetime('now'), datetime('now'), 1, 1, 1),
(2, 'doctor01', 'doctor01@healthcare.com', 'Văn An', 'Nguyễn', 'DOCTOR', 1, 'pbkdf2_sha256$600000$doctor123', datetime('now'), datetime('now'), 1, 0, 0),
(3, 'doctor02', 'doctor02@healthcare.com', 'Thị Bình', 'Trần', 'DOCTOR', 1, 'pbkdf2_sha256$600000$doctor123', datetime('now'), datetime('now'), 1, 0, 0),
(4, 'patient001', 'patient001@gmail.com', 'Văn Anh', 'Nguyễn', 'PATIENT', 1, 'pbkdf2_sha256$600000$patient123', datetime('now'), datetime('now'), 1, 0, 0),
(5, 'patient002', 'patient002@gmail.com', 'Thị Bảo', 'Trần', 'PATIENT', 1, 'pbkdf2_sha256$600000$patient123', datetime('now'), datetime('now'), 1, 0, 0);

-- Sample Doctor Profiles
INSERT INTO users_doctorprofile (id, user_id, specialty, bio, years_experience, practice_certificate, clinic_address, created_at, updated_at) VALUES
(1, 2, 'Tim mạch', 'Bác sĩ chuyên khoa Tim mạch với nhiều năm kinh nghiệm.', 10, 'BS123456', 'Phòng 201, Bệnh viện Đa khoa Trung ương', datetime('now'), datetime('now')),
(2, 3, 'Nhi khoa', 'Bác sĩ chuyên khoa Nhi khoa với nhiều năm kinh nghiệm.', 8, 'BS234567', 'Phòng 302, Bệnh viện Đa khoa Trung ương', datetime('now'), datetime('now'));

-- Sample Patient Profiles  
INSERT INTO users_patientprofile (id, user_id, date_of_birth, address, blood_type, emergency_contact, insurance_provider, insurance_code, insurance_number, allergies, medical_conditions, created_at, updated_at) VALUES
(1, 4, '1985-05-15', '123 Đường ABC, Quận 1, Hà Nội', 'A+', '+84901234567', 'BHXH', 'BH123456', '1234567890', 'Không có', 'Không có', datetime('now'), datetime('now')),
(2, 5, '1990-08-20', '456 Đường XYZ, Quận 2, TP.HCM', 'O+', '+84987654321', 'Bảo Việt', 'BH234567', '2345678901', 'Thuốc kháng sinh', 'Cao huyết áp', datetime('now'), datetime('now'));

-- Sample Admin Profile
INSERT INTO users_adminprofile (id, user_id, admin_code, department, full_control, created_at, updated_at) VALUES
(1, 1, 'ADM001', 'Quản trị hệ thống', 1, datetime('now'), datetime('now'));

-- Sample Doctor Schedules (for appointment service)
-- Note: This would go in appointment_service database
/*
INSERT INTO appointments_doctorschedule (id, doctor_id, weekday, start_time, end_time, is_active, max_patients_per_hour, appointment_duration) VALUES
(1, 2, 0, '08:00:00', '12:00:00', 1, 4, 30),
(2, 2, 0, '14:00:00', '17:00:00', 1, 4, 30),
(3, 3, 1, '08:00:00', '12:00:00', 1, 4, 30),
(4, 3, 1, '14:00:00', '17:00:00', 1, 4, 30);

-- Sample Appointment Slots
INSERT INTO appointments_appointmentslot (id, doctor_id, date, start_time, end_time, max_appointments, booked_count) VALUES
(1, 2, date('now', '+1 day'), '08:00:00', '08:30:00', 1, 0),
(2, 2, date('now', '+1 day'), '08:30:00', '09:00:00', 1, 0),
(3, 3, date('now', '+2 day'), '09:00:00', '09:30:00', 1, 0),
(4, 3, date('now', '+2 day'), '09:30:00', '10:00:00', 1, 0);

-- Sample Appointments
INSERT INTO appointments_appointment (id, patient_id, doctor_id, scheduled_time, end_time, status, reason, priority, patient_name, doctor_name, department, created_at, updated_at) VALUES
(1, 4, 2, datetime('now', '+1 day', '+8 hours'), datetime('now', '+1 day', '+8 hours 30 minutes'), 'CONFIRMED', 'Khám tổng quát', 1, 'Nguyễn Văn Anh', 'Nguyễn Văn An', 'Tim mạch', datetime('now'), datetime('now')),
(2, 5, 3, datetime('now', '+2 day', '+9 hours'), datetime('now', '+2 day', '+9 hours 30 minutes'), 'PENDING', 'Khám định kỳ', 1, 'Trần Thị Bảo', 'Trần Thị Bình', 'Nhi khoa', datetime('now'), datetime('now'));
*/
