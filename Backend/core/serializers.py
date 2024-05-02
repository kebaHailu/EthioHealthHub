from djoser.serializers import UserSerializer, UserCreateSerializer
from rest_framework import serializers
from core.models import Appointment, Prescription


class CustomUserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'password', 'user_role']


class CustomUserSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        fields = ['id', 'username', 'first_name', 'last_name', 'user_role']


class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['id', 'clinical_record', 'technician', 'specialist', 'message', 'appointment_date', 'status', ]


class PrescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prescription
        fields = ['appointment', 'prescription_medicine', 'follow_update', 'archived']
