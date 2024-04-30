from datetime import timezone

from django.db import models

# Create your models here.


class Specialist(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField()
    password = models.CharField(max_length=300)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)





class SpecialistProfile(models.Model):

    GENDER_OPTION = [
        ('M', 'Male'),
        ('F', 'Female')
    ]
    profile_picture = models.CharField(max_length=500, null=True)
    specialist = models.OneToOneField(Specialist, on_delete=models.CASCADE)
    phone = models.CharField(max_length=25, null=True)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=1, choices=GENDER_OPTION, default='M')
    about_me = models.TextField()
    clinic_name = models.CharField(max_length=200)
    clinic_address = models.CharField(max_length=250)
    service = models.CharField(max_length=255)
    specialization = models.CharField(max_length=255)
    license_number = models.CharField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    address_line = models.CharField(max_length=255, null=True)
    city = models.CharField(max_length=255, null=True)
    state = models.CharField(max_length=255, null=True)
    country = models.CharField(max_length=200, null=True)


class Education(models.Model):
    profile = models.ForeignKey(SpecialistProfile, on_delete=models.CASCADE)
    type = models.CharField(max_length=255)
    collage = models.CharField(max_length=255)
    year_of_completion = models.DateField()


class Experience(models.Model):
    profile = models.ForeignKey(SpecialistProfile, on_delete=models.CASCADE)
    hospital_name = models.CharField(max_length=255)
    designation = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField()





