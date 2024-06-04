from rest_framework import serializers
from .models import Technician, Patient, ClinicalRecord, MachineLearningModel, TechnicalReport


class TechnicianSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(max_length=150)
    last_name = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    date_joined = serializers.SerializerMethodField()
    class Meta:
        model = Technician

        fields = ['id', 'first_name', 'last_name', 'email', 'specialization',
                  'phone_number', 'education', 'age', 'date_joined']

    def get_date_joined(self, obj):
        return obj.user.date_joined

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'

    def create(self, validated_data):
        # Get the currently logged-in user
        user = self.context['request'].user

        # Retrieve the technician associated with the user
        technician = Technician.objects.get(user=user)

        # Assign the technician to the validated data
        validated_data['technician'] = technician

        # Create and save the Appointment instance
        patient = Patient.objects.create(**validated_data)

        return patient


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

class TechnicalReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = TechnicalReport
        fields = '__all__'


class MachineLearningModelSerializer(serializers.ModelSerializer):

    clinical_record = DefaultClinicalRecordSerializer(read_only=True)
    patient = PatientSerializer(source='clinical_record.patient', read_only=True)

    class Meta:
        model = MachineLearningModel
        fields = ['id', 'clinical_record', 'patient', 'result', 'accuracy', 'image']


class MachineLearningModelCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = MachineLearningModel
        fields = ['id', 'clinical_record', 'image']

