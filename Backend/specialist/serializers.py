from specialist.models import Specialist, SpecialistProfile, Education, Experience 
from rest_framework import serializers

class SpecialistSerializer(serializers,ModelSerializer):
     class Meta:
        model = Specialist
        fields = ['frist_name', 'last_name', 'email', 'password']

class SpecialistProfileSerializer(serializers,ModelSerializer):
     class Meta:
        model = Specialist
        fields = ['profile_picture', 'specialist','phone', 'date_of_birth', 'gender', 'about_me', 'clinic_name', 'clinic_address', 'service', 'specialization', 'license_number', 'address_line', 'city', 'state', 'country']

class EducationSerializer(serializers,ModelSerializer):
     class Meta:
        model = Education
        fields = ['profile', 'type', 'collage', 'year_of_completion']

class ExperienceSerializer(serializers,ModelSerializer):
     class Meta:
        model = Experience
        fields = ['profile', 'hospital_name', 'designation', 'start_date', 'end_date']

        work_year = serializers.SerializerMethodField(
        method_name='calculate_year')

    def calculate_year(self, Experience: Experience):
        return 
