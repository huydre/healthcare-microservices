from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from .serializers import *
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

User = get_user_model()


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

User = get_user_model()

class DoctorCreateView(APIView):
    permission_classes = [AllowAny]  # hoặc chỉ Admin

    def post(self, request):
        serializer = DoctorRegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(DoctorDetailSerializer(user).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DoctorListView(APIView):
    def get(self, request):
        doctors = User.objects.filter(role='DOCTOR')
        serializer = DoctorDetailSerializer(doctors, many=True)
        return Response(serializer.data)

class RegisterView(APIView):
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser, JSONParser]  # cho phép file upload

    def post(self, request):
        serializer = RegisterSerializer(
            data=request.data,
            context={'request': request}  # để build avatar_url
        )
        if serializer.is_valid():
            user = serializer.save()
            return Response(
                UserSerializer(user, context={'request': request}).data,
                status=201
            )
        return Response(serializer.errors, status=400)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = authenticate(
            username=serializer.validated_data['username'],
            password=serializer.validated_data['password']
        )
        if user:
            token = get_tokens_for_user(user)
            return Response({'token': token})
        return Response({'error': 'Sai tài khoản hoặc mật khẩu'}, status=401)


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def put(self, request):
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Cập nhật thành công'})
        return Response(serializer.errors, status=400)


class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        if not request.user.check_password(serializer.validated_data['old_password']):
            return Response({'error': 'Mật khẩu cũ không đúng'}, status=400)

        request.user.set_password(serializer.validated_data['new_password'])
        request.user.save()
        return Response({'message': 'Đổi mật khẩu thành công'})


class UserListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.role != 'ADMIN':
            return Response({'error': 'Không có quyền'}, status=403)
        users = User.objects.all()
        data = UserSerializer(users, many=True).data
        return Response(data)


class DeleteAccountView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        request.user.delete()
        return Response({'message': 'Tài khoản đã bị xóa'})
