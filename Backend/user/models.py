from django.db import models
from django.contrib.auth.models import AbstractUser, Group


class CustomUser(AbstractUser):

    GENDER_OPTION = [
        ('M', 'Male'),
        ('F', 'Female')
    ]
    date_of_birth = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=1, choices=GENDER_OPTION, default='M')

    class Meta:
        verbose_name = 'Admin'
        verbose_name_plural = 'Admins'


class Patient(CustomUser):
    blood_group = models.CharField(max_length=3, null=True, blank=True)
    profile_img = models.CharField(max_length=255, null=True, blank=True)
    age = models.IntegerField(null=True, blank=True)
    prior_medical_cases = models.TextField()
    pregnancy = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'Patient'
        verbose_name_plural = 'Patients'


class Doctor(CustomUser):
    about_me = models.TextField(null=True, blank=True)
    address = models.OneToOneField('Address', on_delete=models.CASCADE, null=True)
    pricing = models.PositiveIntegerField()
    is_approved = models.BooleanField()

    class Meta:
        verbose_name = 'Doctor'
        verbose_name_plural = 'Doctors'



class Address(models.Model):
    street = models.CharField(max_length=255, null=True, blank=True)
    city = models.CharField(max_length=255, null=True, blank=True)
    state = models.CharField(max_length=255, null=True, blank=True)
    postal_code = models.CharField(max_length=255, null=True, blank=True)




