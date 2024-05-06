from .models import Technician, Patient, ClinicalRecord
from rest_framework import serializers


class TechnicianSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(max_length=150)
    last_name = serializers.CharField(max_length=150)
    email = serializers.EmailField()

    class Meta:
        model = Technician
        fields = ['first_name', 'last_name', 'email','specialization','phone_number','education','profile_image',]

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['__all__']


class ClinicalRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClinicalRecord
        fields = ['__all__']


