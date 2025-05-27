from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .bot import predict_response
import uuid

# Simple session storage - would use Redis or a database in production
chat_sessions = {}

class ChatbotAPIView(APIView):
    """
    POST /api/chatbot/respond/
    Body: {"message": "...", "session_id": "..."}
    """
    def post(self, request):
        msg = request.data.get('message')
        if not msg:
            return Response({'error':'Missing message'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Get or create session ID
        session_id = request.data.get('session_id')
        if not session_id:
            session_id = str(uuid.uuid4())
            
        reply = predict_response(msg, session_id)
        return Response({
            'reply': reply,
            'session_id': session_id
        }, status=status.HTTP_200_OK)