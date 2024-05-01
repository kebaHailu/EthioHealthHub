from specialist.models import Specialist, Education, Experience 
from rest_framework import serializers
from datetime import timedelta

# class (serializers.ModelSerializer):
#      class Meta:
#         model = Specialist
#         fields = ['frist_name', 'last_name', 'email', 'password']

class SpecialistSerializer(serializers.ModelSerializer):
     class Meta:
        model = Specialist
        fields = ['profile_picture','is_license_verified' , 'phone', 'date_of_birth', 'gender', 'about_me', 'clinic_name', 'clinic_address', 'service', 'specialization', 'license_number', 'address_line', 'city', 'state', 'country']
         
     is_license_verified = serializers.BooleanField(default=False, read_only=True)
        

class EducationSerializer(serializers.ModelSerializer):
     class Meta:
        model = Education
        fields = ['profile', 'type', 'collage', 'year_of_completion']


class ExperienceSerializer(serializers.ModelSerializer):
     class Meta:
        model = Experience
        fields = ['profile', 'hospital_name', 'designation', 'start_date', 'end_date']


