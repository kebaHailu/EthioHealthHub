from specialist.models import Specialist, Education, Experience 
from rest_framework import serializers
from core.models import User

class UserSerializer(serializers.ModelSerializer):
     class Meta:
        ref_name = "SpecialistUser"
        model = User
        fields = ['first_name', 'username', 'last_name', 'email']


class SpecialistSerializer(serializers.ModelSerializer):
    # user = UserSerializer(read_only=True)

    class Meta:
        model = Specialist

        fields = ['user', 'profile_picture', 'is_license_verified', 'phone',
                  'date_of_birth', 'gender', 'about_me', 'clinic_name', 'clinic_address', 'service', 'specialization',
                  'license_number', 'address_line', 'city', 'state', 'country']

    is_license_verified = serializers.BooleanField(default=False, read_only=True)


class EducationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Education
        fields = ['profile', 'type', 'collage', 'year_of_completion']


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = ['profile', 'hospital_name', 'designation', 'start_date', 'end_date']


