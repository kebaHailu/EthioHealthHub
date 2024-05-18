from rest_framework import serializers
from .models import Technician, Patient, ClinicalRecord, MachineLearningModel


class TechnicianSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(max_length=150)
    last_name = serializers.CharField(max_length=150)
    email = serializers.EmailField()

    class Meta:
        model = Technician
        fields = ['id', 'first_name', 'last_name', 'email', 'specialization', 'phone_number', 'education']


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'


class DefaultClinicalRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClinicalRecord
        fields = '__all__'


class ClinicalRecordSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        data = super().to_representation(instance)
        if self.context['request'].method == 'GET':
            patient_data = PatientSerializer(instance.patient).data
            data['patient'] = patient_data
        return data

    class Meta:
        model = ClinicalRecord
        fields = '__all__'


class MachineLearningModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = MachineLearningModel
        fields = ['image', 'clinical_record',]
