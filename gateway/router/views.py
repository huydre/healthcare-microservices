import requests
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from urllib.parse import urlparse
import jwt



def forward_request(method, url, data=None, headers=None, params=None):
    import requests
    from rest_framework.response import Response

    headers = headers or {}
    parsed_url = urlparse(url)
    host = parsed_url.hostname  # Chỉ lấy phần 'user_service', không có ':8001'

    # ✅ Gán lại Host chính xác để không bị lỗi DisallowedHost
    headers['Host'] = host

    try:
        response = requests.request(
            method=method,
            url=url,
            json=data,
            headers=headers,
            params=params,
            timeout=10
        )
        return Response(response.json(), status=response.status_code)
    except Exception as e:
        print(f"❌ ERROR: {e}")
        return Response({"error": str(e)}, status=500)


# ---- USER SERVICE ----

class ProxyRegister(APIView):
    def post(self, request):
        return forward_request('POST', f"{settings.USER_SERVICE}/api/users/register/", data=request.data)

class ProxyLogin(APIView):
    def post(self, request):
        return forward_request('POST', f"{settings.USER_SERVICE}/api/users/login/", data=request.data)

class ProxyUserMe(APIView):
    def get(self, request):
        return forward_request('GET', f"{settings.USER_SERVICE}/api/users/me/", headers={'Authorization': request.headers.get('Authorization')})

    def put(self, request):
        return forward_request('PUT', f"{settings.USER_SERVICE}/api/users/me/", data=request.data, headers={'Authorization': request.headers.get('Authorization')})

    def delete(self, request):
        return forward_request('DELETE', f"{settings.USER_SERVICE}/api/users/delete/", headers={'Authorization': request.headers.get('Authorization')})

class ProxyUserList(APIView):
    def get(self, request):
        return forward_request(
            'GET',
            f"{settings.USER_SERVICE}/api/users/all/",
            headers={'Authorization': request.headers.get('Authorization')}
        )

class ProxyUserDoctors(APIView):
    def get(self, request):
        return forward_request(
            'GET',
            f"{settings.USER_SERVICE}/api/users/doctors/"
        )

# ---- APPOINTMENT SERVICE ----

class ProxyAppointmentCreate(APIView):
    """
    POST /api/appointments/create/
    Body cần bao gồm field patient_id, doctor_id, scheduled_time, reason
    """
    def post(self, request):
        # 1. Lấy token
        auth = request.headers.get('Authorization','')
        if not auth.startswith('Bearer '):
            return Response({'error':'Missing Bearer token'}, status=401)
        token = auth.split(' ',1)[1]

        # 2. Decode JWT
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            patient_id = payload.get('user_id')
        except jwt.PyJWTError as e:
            return Response({'error':'Invalid token','detail':str(e)}, status=401)

        # 3. Chuẩn bị body mới
        body = request.data.copy()
        body['patient_id'] = patient_id

        # 4. Forward
        return forward_request(
            'POST',
            f"{settings.APPOINTMENT_SERVICE}/api/appointments/create/",
            data=body
        )

class ProxyAppointmentList(APIView):
    """
    GET /api/appointments/?role=PATIENT&user_id=3  (hoặc DOCTOR)
    """
    def get(self, request):
        auth = request.headers.get('Authorization','')
        if not auth.startswith('Bearer '):
            return Response({'error':'Missing Bearer token'}, status=401)
        token = auth.split(' ',1)[1]

        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = payload.get('user_id')
            role = payload.get('role','PATIENT')  # nếu payload không có role
        except jwt.PyJWTError as e:
            return Response({'error':'Invalid token','detail':str(e)}, status=401)

        # forward query params
        params = {'role': role, 'user_id': user_id}
        return forward_request(
            'GET',
            f"{settings.APPOINTMENT_SERVICE}/api/appointments/",
            params=params
        )

class ProxyAppointmentDetail(APIView):
    def get(self, request, pk):
        return forward_request(
            'GET',
            f"{settings.APPOINTMENT_SERVICE}/api/appointments/{pk}/"
        )

    def put(self, request, pk):
        auth = request.headers.get('Authorization','')
        if not auth.startswith('Bearer '):
            return Response({'error':'Missing Bearer token'}, status=401)
        token = auth.split(' ',1)[1]
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        except jwt.PyJWTError as e:
            return Response({'error':'Invalid token','detail':str(e)}, status=401)

        return forward_request(
            'PUT',
            f"{settings.APPOINTMENT_SERVICE}/api/appointments/{pk}/",
            data=request.data
        )

    def delete(self, request, pk):
        auth = request.headers.get('Authorization','')
        if not auth.startswith('Bearer '):
            return Response({'error':'Missing Bearer token'}, status=401)
        token = auth.split(' ',1)[1]
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        except jwt.PyJWTError as e:
            return Response({'error':'Invalid token','detail':str(e)}, status=401)

        return forward_request(
            'DELETE',
            f"{settings.APPOINTMENT_SERVICE}/api/appointments/{pk}/"
        )


# ---- CLINICAL SERVICE ----

class ProxyMedicalRecordCreate(APIView):
    def post(self, request):
        return forward_request('POST', f"{settings.CLINICAL_SERVICE}/api/records/create/", data=request.data, headers={'Authorization': request.headers.get('Authorization')})

class ProxyMedicalRecordList(APIView):
    def get(self, request):
        return forward_request('GET', f"{settings.CLINICAL_SERVICE}/api/records/", headers={'Authorization': request.headers.get('Authorization')})

class ProxyVitalSignCreate(APIView):
    def post(self, request):
        return forward_request('POST', f"{settings.CLINICAL_SERVICE}/api/records/vitals/", data=request.data, headers={'Authorization': request.headers.get('Authorization')})


# ---- PHARMACY SERVICE ----
class ProxyPharmacyPrescriptionCreate(APIView):
    def post(self, request):
        return forward_request('POST', f"{settings.PHARMACY_SERVICE}/api/pharmacy/prescriptions/create/", data=request.data, headers={'Authorization': request.headers.get('Authorization')})

class ProxyPharmacyPrescriptionList(APIView):
    def get(self, request):
        return forward_request('GET', f"{settings.PHARMACY_SERVICE}/api/pharmacy/prescriptions/", headers={'Authorization': request.headers.get('Authorization')})

class ProxyPharmacyPrescriptionDispense(APIView):
    def post(self, request, pk):
        return forward_request('POST', f"{settings.PHARMACY_SERVICE}/api/pharmacy/prescriptions/{pk}/dispense/", headers={'Authorization': request.headers.get('Authorization')})

class ProxyPharmacyInventoryView(APIView):
    def get(self, request):
        return forward_request('GET', f"{settings.PHARMACY_SERVICE}/api/pharmacy/inventory/", headers={'Authorization': request.headers.get('Authorization')})
    

# ---- LAB SERVICE ----
class ProxyLabTestList(APIView):
    def get(self, request):
        return forward_request('GET', f"{settings.LAB_SERVICE}/api/lab/tests/")

class ProxyLabOrderList(APIView):
    def get(self, request):
        return forward_request('GET', f"{settings.LAB_SERVICE}/api/lab/orders/", headers={'Authorization': request.headers.get('Authorization')})

class ProxyLabOrderCreate(APIView):
    def post(self, request):
        return forward_request('POST', f"{settings.LAB_SERVICE}/api/lab/orders/create/", data=request.data, headers={'Authorization': request.headers.get('Authorization')})

class ProxyLabResultList(APIView):
    def get(self, request):
        return forward_request('GET', f"{settings.LAB_SERVICE}/api/lab/results/", headers={'Authorization': request.headers.get('Authorization')})

class ProxyLabResultCreate(APIView):
    def post(self, request):
        return forward_request('POST', f"{settings.LAB_SERVICE}/api/lab/results/create/", data=request.data, headers={'Authorization': request.headers.get('Authorization')})


# ---- INSURANCE SERVICE ----
class ProxyClaimCreate(APIView):
    def post(self, request):
        return forward_request('POST', f"{settings.INSURANCE_SERVICE}/api/insurance/claims/create/", data=request.data, headers={'Authorization': request.headers.get('Authorization')})

class ProxyClaimList(APIView):
    def get(self, request):
        return forward_request('GET', f"{settings.INSURANCE_SERVICE}/api/insurance/claims/", headers={'Authorization': request.headers.get('Authorization')})

class ProxyClaimUpdate(APIView):
    def put(self, request, pk):
        return forward_request('PUT', f"{settings.INSURANCE_SERVICE}/api/insurance/claims/{pk}/update/", data=request.data, headers={'Authorization': request.headers.get('Authorization')})



# ---- NOTIFICATION SERVICE ----
class ProxyNotifySend(APIView):
    def post(self, request):
        return forward_request('POST', f"{settings.NOTIFICATION_SERVICE}/api/notify/send/", data=request.data, headers={'Authorization': request.headers.get('Authorization')})

class ProxyNotifyList(APIView):
    def get(self, request):
        return forward_request('GET', f"{settings.NOTIFICATION_SERVICE}/api/notify/", headers={'Authorization': request.headers.get('Authorization')})


# ---- VIRTUAL ROBOT SERVICE ----
class ProxyVRDiagnose(APIView):
    """
    Proxy POST /api/vr/diagnose/ tới VirtualRobot Service
    """
    def post(self, request):
        return forward_request(
            'POST',
            f"{settings.VIRTUALROBOT_SERVICE}/api/vr/diagnose/",
            data=request.data
        )
    


class ProxyChatbotRespond(APIView):
    def post(self, request):
        return forward_request(
            'POST',
            f"{settings.CHATBOT_SERVICE}/api/chatbot/respond/",
            data=request.data,
        )
