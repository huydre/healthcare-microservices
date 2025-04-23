from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = [
        ('PATIENT', 'Patient'),
        ('DOCTOR', 'Doctor'),
        ('NURSE', 'Nurse'),
        ('PHARMACIST', 'Pharmacist'),
        ('ADMIN', 'Admin'),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    is_verify = models.BooleanField(default=False)


class PatientProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    date_of_birth = models.DateField()
    address = models.TextField()
    insurance_code = models.CharField(max_length=30)

    def __str__(self):
        return f"PatientProfile for {self.user.username}"


class DoctorProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    specialty = models.CharField(max_length=100)
    practice_certificate = models.CharField(max_length=50)

    def __str__(self):
        return f"Dr. {self.user.get_full_name()}"


class NurseProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    department = models.CharField(max_length=100)
    shift = models.CharField(max_length=20)

    def __str__(self):
        return f"Nurse {self.user.username}"


class PharmacistProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    license_number = models.CharField(max_length=50)
    working_hours = models.CharField(max_length=100)

    def __str__(self):
        return f"Pharmacist {self.user.username}"


class AdminProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    admin_code = models.CharField(max_length=30)
    full_control = models.BooleanField(default=False)

    def __str__(self):
        return f"Admin {self.user.username}"
