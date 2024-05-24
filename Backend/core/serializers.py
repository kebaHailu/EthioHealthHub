from rest_framework import serializers

from specialist.serializers import SpecialistSerializer
from .models import Appointment, Prescription
from technician.models import Technician
from technician.serializers import PatientSerializer, ClinicalRecordSerializer


class AppointmentSerializer(serializers.ModelSerializer):


    class Meta:
        #fields = '__all__'
        model = Appointment
        exclude = ['technician', 'status']


    def create(self, validated_data):
        # Get the currently logged-in user
        user = self.context['request'].user

        # Retrieve the technician associated with the user
        technician = Technician.objects.get(user=user)

        # Assign the technician to the validated data
        validated_data['technician'] = technician

        # Create and save the Appointment instance
        appointment = Appointment.objects.create(**validated_data)

        return appointment


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
        fields = ['id', 'patient_name', 'appointment_date', 'specialization', 'status', 'gender', 'station_name',
                  'technician_first_name', 'technician_last_name', 'specialist_first_name', 'specialist_last_name']


class AppointmentDetailSerializer(serializers.ModelSerializer):

    clinical_record = ClinicalRecordSerializer()
    specialist = SpecialistSerializer()

    class Meta:
        model = Appointment
        fields = ['clinical_record', 'specialist', 'appointment_date', 'message', 'status']


class PrescriptionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Prescription
        fields = '__all__'
