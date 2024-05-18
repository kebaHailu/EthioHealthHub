from rest_framework import serializers

from specialist.serializers import SpecialistSerializer
from .models import Appointment, Prescription
from technician.serializers import PatientSerializer, ClinicalRecordSerializer


class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'


class AppointmentGetSerializer(serializers.ModelSerializer):
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


class AppointmentDetailSerializer(serializers.ModelSerializer):
    #patient = PatientSerializer()
    clinical_record = ClinicalRecordSerializer()
    specialist = SpecialistSerializer()

    class Meta:
        model = Appointment
        fields = ['clinical_record', 'clinical_record', 'specialist', 'appointment_date', 'message', 'status']


class PrescriptionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Prescription
        fields = '__all__'
