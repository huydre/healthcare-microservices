# appointments/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Appointment
from .serializers import AppointmentSerializer
import jwt
from django.conf import settings

def send_notification(user_id, message):
    import requests
    url = "http://notificationservice:8007/api/notify/send/"
    data = {
        "recipient_id": user_id,
        "message": message,
        "notification_type": "SYSTEM"
    }
    try:
        # không còn cần JWT
        requests.post(url, json=data)
    except Exception as e:
        print(f"⚠️ Không thể gửi notify: {e}")


class AppointmentCreateView(APIView):
    """
    POST /api/appointments/create/
    {
      "patient_id": 3,
      "doctor_id": 2,
      "scheduled_time": "2025-05-01T10:00:00Z",
      "reason": "Khám tai mũi họng"
    }
    """
    def post(self, request):
        data = request.data.copy()
        # patient_id bây giờ lấy từ payload
        if 'patient_id' not in data:
            return Response({"error": "Thiếu patient_id"}, status=400)

        serializer = AppointmentSerializer(data=data)
        if serializer.is_valid():
            appointment = serializer.save()
            # Gửi notify
            send_notification(
                user_id=appointment.patient_id,
                message=(
                    f"Lịch hẹn với bác sĩ {appointment.doctor_id} "
                    f"đã được đặt lúc {appointment.scheduled_time}"
                )
            )
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)


class AppointmentListView(APIView):
    """
    GET /api/appointments/?role=PATIENT
    hoặc
    GET /api/appointments/?role=DOCTOR
    
    Header: Authorization: Bearer <your_token>
    """
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        # Lấy token từ header
        auth_header = request.META.get('HTTP_AUTHORIZATION', '')
        if not auth_header.startswith('Bearer '):
            return Response({"error": "Bearer token is required"}, status=401)
        
        token = auth_header.split(' ')[1]
        
        try:
            # Decode token để lấy thông tin người dùng
            # Sử dụng SECRET_KEY từ settings để verify token
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = payload.get('user_id')
            
            if not user_id:
                return Response({"error": "Token không hợp lệ hoặc không chứa user_id"}, status=401)
            
            # Lấy role từ query params
            role = request.query_params.get('role')
            if not role:
                return Response({"error": "Phải cung cấp role trong query params"}, status=400)
            
            # Lọc lịch hẹn dựa trên role và user_id từ token
            if role.upper() == 'PATIENT':
                qs = Appointment.objects.filter(patient_id=user_id)
            elif role.upper() == 'DOCTOR':
                qs = Appointment.objects.filter(doctor_id=user_id)
            else:
                return Response(
                    {"error": "Role phải là PATIENT hoặc DOCTOR"},
                    status=400
                )
            
            serializer = AppointmentSerializer(qs, many=True)
            return Response(serializer.data)
            
        except jwt.ExpiredSignatureError:
            return Response({"error": "Token đã hết hạn"}, status=401)
        except jwt.InvalidTokenError:
            return Response({"error": "Token không hợp lệ"}, status=401)
        except Exception as e:
            return Response({"error": f"Lỗi xác thực: {str(e)}"}, status=500)


class AppointmentDetailView(APIView):
    """
    GET    /api/appointments/<pk>/
    PUT    /api/appointments/<pk>/      (body có các field cần cập nhật)
    DELETE /api/appointments/<pk>/
    """
    def get(self, request, pk):
        try:
            appt = Appointment.objects.get(pk=pk)
            return Response(AppointmentSerializer(appt).data)
        except Appointment.DoesNotExist:
            return Response({'error': 'Không tìm thấy lịch'}, status=404)

    def put(self, request, pk):
        try:
            appt = Appointment.objects.get(pk=pk)
        except Appointment.DoesNotExist:
            return Response({'error': 'Không tìm thấy lịch'}, status=404)

        serializer = AppointmentSerializer(appt, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def delete(self, request, pk):
        try:
            appt = Appointment.objects.get(pk=pk)
        except Appointment.DoesNotExist:
            return Response({'error': 'Không tìm thấy lịch'}, status=404)

        appt.delete()
        return Response({'message': 'Đã xóa lịch'}, status=204)
