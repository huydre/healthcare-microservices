from django.urls import path
from .views import ChatbotAPIView

urlpatterns = [
    path('respond/', ChatbotAPIView.as_view(), name='chatbot-respond'),
]
