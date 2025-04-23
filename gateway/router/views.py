import requests
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response

def forward_request(method, url, data=None, headers=None, params=None):
    response = requests.request(method, url, json=data, headers=headers, params=params)
    try:
        return Response(response.json(), status=response.status_code)
    except:
        return Response(response.text, status=response.status_code)

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

# ---- APPOINTMENT SERVICE ----

class ProxyAppointmentCreate(APIView):
    def post(self, request):
        return forward_request('POST', f"{settings.APPOINTMENT_SERVICE}/api/appointments/create/", data=request.data, headers={'Authorization': request.headers.get('Authorization')})

class ProxyAppointmentList(APIView):
    def get(self, request):
        return forward_request('GET', f"{settings.APPOINTMENT_SERVICE}/api/appointments/", headers={'Authorization': request.headers.get('Authorization')})

class ProxyAppointmentDetail(APIView):
    def put(self, request, pk):
        return forward_request('PUT', f"{settings.APPOINTMENT_SERVICE}/api/appointments/{pk}/", data=request.data, headers={'Authorization': request.headers.get('Authorization')})

    def delete(self, request, pk):
        return forward_request('DELETE', f"{settings.APPOINTMENT_SERVICE}/api/appointments/{pk}/", headers={'Authorization': request.headers.get('Authorization')})


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
