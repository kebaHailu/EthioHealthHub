from rest_framework import serializers
from .models import Appointment, Prescription


class AppointmentSerializer(serializers.ModelSerializer):
    patient_name = serializers.SerializerMethodField()
    gender = serializers.CharField(source='clinical_record.patient.gender')
    station_name = serializers.CharField(source='technician.station.name')
    technician_first_name = serializers.CharField(source='technician.user.first_name')
    technician_last_name = serializers.CharField(source='technician.user.last_name')
    specialist_first_name = serializers.CharField(source='specialist.user.first_name')
    specialist_last_name = serializers.CharField(source='specialist.user.last_name')
    specialization = serializers.CharField(source='specialist.specialization')
    def get_patient_name(self, obj):
        return f"{obj.clinical_record.patient.first_name} {obj.clinical_record.patient.last_name}"

    class Meta:
        model = Appointment
        fields = ['id', 'patient_name', 'appointment_date', 'specialization', 'status', 'gender', 'station_name', 'technician_first_name', 'technician_last_name',
                  'specialist_first_name', 'specialist_last_name']



class PrescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prescription
        fields = '__all__'
