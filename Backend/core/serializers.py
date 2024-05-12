from rest_framework.serializers import ModelSerializer
from .models import Appointment, Prescription


class AppointmentSerializer(ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'

class PrescriptionSerializer(ModelSerializer):
    class Meta:
        model = Prescription
        fields = '__all__'
