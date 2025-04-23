from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Appointment
from .serializers import AppointmentSerializer
from rest_framework.permissions import IsAuthenticated

class AppointmentCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data.copy()
        data['patient_id'] = request.user.id  # Lấy từ JWT
        serializer = AppointmentSerializer(data=data)
        if serializer.is_valid():
            appointment = serializer.save()
            send_notification(
                user_id=appointment.patient_id,
                message=f"Lịch hẹn với bác sĩ {appointment.doctor_id} đã được đặt lúc {appointment.scheduled_time}",
                token=request.headers.get('Authorization').split(' ')[1]
            )
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class AppointmentListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_id = request.user.id
        if request.user.role == 'PATIENT':
            appointments = Appointment.objects.filter(patient_id=user_id)
        elif request.user.role == 'DOCTOR':
            appointments = Appointment.objects.filter(doctor_id=user_id)
        else:
            return Response({'error': 'Không có quyền'}, status=403)

        serializer = AppointmentSerializer(appointments, many=True)
        return Response(serializer.data)

class AppointmentDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            appointment = Appointment.objects.get(pk=pk)
            return Response(AppointmentSerializer(appointment).data)
        except Appointment.DoesNotExist:
            return Response({'error': 'Không tìm thấy lịch hẹn'}, status=404)

    def put(self, request, pk):
        try:
            appointment = Appointment.objects.get(pk=pk)
        except Appointment.DoesNotExist:
            return Response({'error': 'Không tìm thấy'}, status=404)

        if request.user.id != appointment.patient_id:
            return Response({'error': 'Không có quyền sửa'}, status=403)

        serializer = AppointmentSerializer(appointment, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Cập nhật thành công'})
        return Response(serializer.errors, status=400)

    def delete(self, request, pk):
        try:
            appointment = Appointment.objects.get(pk=pk)
        except Appointment.DoesNotExist:
            return Response({'error': 'Không tìm thấy'}, status=404)

        if request.user.id != appointment.patient_id:
            return Response({'error': 'Không có quyền xóa'}, status=403)

        appointment.delete()
        return Response({'message': 'Đã hủy lịch'})

def send_notification(user_id, message, token):
    import requests
    url = "http://localhost:8007/api/notify/send/"
    data = {
        "recipient_id": user_id,
        "message": message,
        "notification_type": "SYSTEM"
    }
    headers = {"Authorization": f"Bearer {token}"}
    try:
        requests.post(url, json=data, headers=headers)
    except Exception as e:
        print(f"⚠️ Không thể gửi notify: {e}")
