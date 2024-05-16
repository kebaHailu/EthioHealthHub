from datetime import timezone

from django.db import models
from django.conf import settings
# Create your models here.


class Specialist(models.Model):

    GENDER_OPTION = [
        ('M', 'Male'),
        ('F', 'Female')
    ]
    is_license_verified = models.BooleanField(default=False)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    profile_picture = models.ImageField(upload_to='images/', null=True, blank=True)
    phone = models.CharField(max_length=25, null=True)
    date_of_birth = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=1, choices=GENDER_OPTION, default='M')
    about_me = models.TextField()
    clinic_name = models.CharField(max_length=200, null=True)
    clinic_address = models.CharField(max_length=250, null=True)
    service = models.CharField(max_length=255, null=True)
    specialization = models.CharField(max_length=255, null=True)
    license_number = models.CharField(max_length=300, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    address_line = models.CharField(max_length=255, null=True)
    city = models.CharField(max_length=255, null=True)
    state = models.CharField(max_length=255, null=True)
    country = models.CharField(max_length=200, null=True)

    edu_type = models.CharField(max_length=255, null=True)
    edu_collage = models.CharField(max_length=255, null=True)
    edu_year_of_completion = models.DateField(null=True)

    exp_hospital_name = models.CharField(max_length=255, null=True)
    exp_designation = models.CharField(max_length=255, null=True)
    exp_start_date = models.DateField(null=True)
    exp_end_date = models.DateField(null=True)

    def __str__(self):
        return self.first_name() + " " + self.last_name()

    def first_name(self):
        return self.user.first_name

    def last_name(self):
        return self.user.last_name

    def email(self):
        return self.user.email

    def username(self):
        return self.user.username






