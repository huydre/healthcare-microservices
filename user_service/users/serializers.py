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
    # SerializerMethodFields for computed fields
    avatar_url = serializers.SerializerMethodField()
    profile_data = serializers.SerializerMethodField()
    phone = serializers.SerializerMethodField()
    date_of_birth = serializers.SerializerMethodField()
    address = serializers.SerializerMethodField()
    emergency_contact = serializers.SerializerMethodField()
    blood_type = serializers.SerializerMethodField()
    allergies = serializers.SerializerMethodField()
    medical_conditions = serializers.SerializerMethodField()
    insurance_number = serializers.SerializerMethodField()

    class Meta:
        model = User
        # bao gồm avatar để write, avatar_url để read
        fields = [
            'id','username','first_name','last_name','full_name','email','phone_number',
            'gender','role','avatar','avatar_url','profile_data','date_joined','last_updated',
            # Add additional fields that might be expected by frontend
            'phone', 'date_of_birth', 'address', 'emergency_contact', 'blood_type', 
            'allergies', 'medical_conditions', 'insurance_number'
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

    def get_profile_data(self, obj):
        """Get role-specific profile data"""
        try:
            if obj.role == 'PATIENT':
                if hasattr(obj, 'patientprofile'):
                    profile = obj.patientprofile
                    return {
                        'date_of_birth': profile.date_of_birth,
                        'address': profile.address,
                        'blood_type': profile.blood_type,
                        'emergency_contact': profile.emergency_contact,
                        'insurance_provider': profile.insurance_provider,
                        'insurance_code': profile.insurance_code,
                        'allergies': getattr(profile, 'allergies', ''),
                        'medical_conditions': getattr(profile, 'medical_conditions', ''),
                    }
            elif obj.role == 'DOCTOR':
                if hasattr(obj, 'doctorprofile'):
                    profile = obj.doctorprofile
                    return {
                        'specialty': profile.specialty,
                        'bio': profile.bio,
                        'years_experience': profile.years_experience,
                        'practice_certificate': profile.practice_certificate,
                        'clinic_address': profile.clinic_address,
                    }
            elif obj.role == 'NURSE':
                if hasattr(obj, 'nurseprofile'):
                    profile = obj.nurseprofile
                    return {
                        'department': profile.department,
                        'shift': profile.shift,
                    }
        except Exception as e:
            print(f"Error getting profile data: {e}")
        return {}

    # Add property methods for profile fields
    def get_phone(self, obj):
        """Return phone_number as phone for frontend compatibility"""
        return obj.phone_number

    def get_date_of_birth(self, obj):
        """Get date_of_birth from profile_data"""
        if hasattr(obj, 'patientprofile'):
            return obj.patientprofile.date_of_birth
        return None

    def get_address(self, obj):
        """Get address from profile_data"""
        if hasattr(obj, 'patientprofile'):
            return obj.patientprofile.address
        elif hasattr(obj, 'doctorprofile'):
            return obj.doctorprofile.clinic_address
        return None

    def get_emergency_contact(self, obj):
        """Get emergency_contact from profile_data"""
        if hasattr(obj, 'patientprofile'):
            return obj.patientprofile.emergency_contact
        return None

    def get_blood_type(self, obj):
        """Get blood_type from profile_data"""
        if hasattr(obj, 'patientprofile'):
            return obj.patientprofile.blood_type
        return None

    def get_allergies(self, obj):
        """Get allergies from profile_data"""
        if hasattr(obj, 'patientprofile'):
            return obj.patientprofile.allergies
        return None

    def get_medical_conditions(self, obj):
        """Get medical_conditions from profile_data"""
        if hasattr(obj, 'patientprofile'):
            return obj.patientprofile.medical_conditions
        return None

    def get_insurance_number(self, obj):
        """Get insurance_number from profile_data"""
        if hasattr(obj, 'patientprofile'):
            return obj.patientprofile.insurance_code
        return None

    def update(self, instance, validated_data):
        """Custom update method to handle profile fields"""
        # Extract profile-related fields
        profile_fields = {
            'date_of_birth': validated_data.pop('date_of_birth', None),
            'address': validated_data.pop('address', None),
            'emergency_contact': validated_data.pop('emergency_contact', None),
            'blood_type': validated_data.pop('blood_type', None),
            'allergies': validated_data.pop('allergies', None),
            'medical_conditions': validated_data.pop('medical_conditions', None),
            'insurance_number': validated_data.pop('insurance_number', None),
        }
        
        # Update basic user fields
        for attr, value in validated_data.items():
            if attr == 'phone':
                # Map phone to phone_number
                setattr(instance, 'phone_number', value)
            else:
                setattr(instance, attr, value)
        
        instance.save()
        
        # Update profile fields if user is a patient
        if instance.role == 'PATIENT' and any(profile_fields.values()):
            try:
                profile = instance.patientprofile
            except:
                # Create profile if it doesn't exist
                from .models import PatientProfile
                profile = PatientProfile.objects.create(user=instance)
            
            # Update profile fields
            for field, value in profile_fields.items():
                if value is not None:
                    if field == 'insurance_number':
                        # Map insurance_number to insurance_code
                        setattr(profile, 'insurance_code', value)
                    else:
                        setattr(profile, field, value)
            
            profile.save()
        
        return instance

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

