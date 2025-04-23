from django.urls import path
from .views import *

urlpatterns = [
    # User
    path('users/register/', ProxyRegister.as_view()),
    path('users/login/', ProxyLogin.as_view()),
    path('users/me/', ProxyUserMe.as_view()),
    path('users/all/', ProxyUserList.as_view()),

    
    # Appointment
    path('appointments/', ProxyAppointmentList.as_view()),
    path('appointments/create/', ProxyAppointmentCreate.as_view()),
    path('appointments/<int:pk>/', ProxyAppointmentDetail.as_view()),

    # Clinical
    path('records/', ProxyMedicalRecordList.as_view()),
    path('records/create/', ProxyMedicalRecordCreate.as_view()),
    path('records/vitals/', ProxyVitalSignCreate.as_view()),
]
