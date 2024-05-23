from specialist.models import Specialist
from rest_framework import serializers


class SpecialistSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=150)
    first_name = serializers.CharField(max_length=150)
    last_name = serializers.CharField(max_length=150)
    email = serializers.EmailField()

    class Meta:
        model = Specialist
        fields = [ 'id',
            'first_name', 'last_name','username', 'email', 'profile_picture','is_license_verified' ,
            'phone', 'date_of_birth', 'gender', 'about_me', 'clinic_name', 'clinic_address', 'service',
            'specialization', 'license_number', 'address_line', 'city', 'state', 'country',
            'edu_type','edu_collage','edu_year_of_completion','exp_hospital_name','exp_designation','exp_start_date',
            'exp_end_date'
        ]

    is_license_verified = serializers.BooleanField(default=False, read_only=True)

        


