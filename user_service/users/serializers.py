# users/serializers.py
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import PatientProfile, DoctorProfile, NurseProfile, PharmacistProfile, AdminProfile

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'role']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True)

class UserSerializer(serializers.ModelSerializer):
    # field trả ra avatar URL
    avatar_url = serializers.SerializerMethodField()

    class Meta:
        model = User
        # bao gồm avatar để write, avatar_url để read
        fields = [
            'id','username','full_name','email','phone_number',
            'gender','role','avatar','avatar_url'
        ]
        extra_kwargs = {
            'avatar': {'write_only': True, 'required': False},
        }

    def get_avatar_url(self, obj):
        request = self.context.get('request')
        if obj.avatar:
            url = obj.avatar.url  # /media/avatars/...
            # trả về full absolute URL nếu cần:
            return request.build_absolute_uri(url)
        return None

# Serializer for detailed doctor info, includes profile
class DoctorDetailSerializer(serializers.ModelSerializer):
    specialty = serializers.CharField(source='doctorprofile.specialty')
    bio = serializers.CharField(source='doctorprofile.bio')
    years_experience = serializers.IntegerField(source='doctorprofile.years_experience')
    practice_certificate = serializers.CharField(source='doctorprofile.practice_certificate')
    clinic_address = serializers.CharField(source='doctorprofile.clinic_address')

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'phone_number', 'gender',
                  'specialty', 'bio', 'years_experience', 'practice_certificate', 'clinic_address']

# Serializer to register a new doctor, handles User + DoctorProfile
class DoctorRegisterSerializer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    phone_number = serializers.CharField()
    gender = serializers.ChoiceField(choices=User.GENDER_CHOICES)
    specialty = serializers.CharField()
    bio = serializers.CharField(allow_blank=True)
    years_experience = serializers.IntegerField()
    practice_certificate = serializers.CharField(allow_blank=True)
    clinic_address = serializers.CharField(allow_blank=True)

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already taken")
        return value

    def create(self, validated_data):
        # Pop profile fields
        specialty = validated_data.pop('specialty')
        bio = validated_data.pop('bio')
        years = validated_data.pop('years_experience')
        cert = validated_data.pop('practice_certificate')
        address = validated_data.pop('clinic_address')
        password = validated_data.pop('password')

        # Create user
        user = User(
            username=validated_data['username'],
            email=validated_data['email'],
            phone_number=validated_data.get('phone_number',''),
            gender=validated_data.get('gender',''),
            role='DOCTOR'
        )
        user.set_password(password)
        user.save()

        # Create DoctorProfile
        DoctorProfile.objects.create(
            user=user,
            specialty=specialty,
            bio=bio,
            years_experience=years,
            practice_certificate=cert,
            clinic_address=address
        )
        return user

