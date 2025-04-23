from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import MedicalRecord, VitalSign
from .serializers import MedicalRecordSerializer, VitalSignSerializer
from rest_framework.permissions import IsAuthenticated

class CreateMedicalRecordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data.copy()
        data['doctor_id'] = request.user.id
        serializer = MedicalRecordSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class ListMedicalRecordsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.role == 'PATIENT':
            records = MedicalRecord.objects.filter(patient_id=request.user.id)
        elif request.user.role == 'DOCTOR':
            records = MedicalRecord.objects.filter(doctor_id=request.user.id)
        else:
            return Response({'error': 'Không có quyền'}, status=403)

        serializer = MedicalRecordSerializer(records, many=True)
        return Response(serializer.data)

class AddVitalSignView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = VitalSignSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
