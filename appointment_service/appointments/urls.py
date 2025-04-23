from django.urls import path
from .views import *

urlpatterns = [
    path('', AppointmentListView.as_view()),
    path('create/', AppointmentCreateView.as_view()),
    path('<int:pk>/', AppointmentDetailView.as_view()),
]
