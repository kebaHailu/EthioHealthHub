from django.db import models

from station.models import Station


# Create your models here.

class Technician(models.Model):
    name = models.CharField(max_length=255)
    age = models.IntegerField()
    email = models.EmailField()
    phone_number = models.CharField(max_length=25)
    specialization = models.CharField(max_length=255)
    education = models.TextField(blank=True)
    profile_image = models.CharField(max_length=255, blank=True, null=True)
    password = models.CharField(max_length=300)
    station = models.ForeignKey(Station, on_delete=models.CASCADE)


class Patient(models.Model):
    GENDER_OPTION = [
        ('M', 'Male'),
        ('F', 'Female')
    ]

    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    age = models.IntegerField()
    gender = models.CharField(max_length=1, choices=GENDER_OPTION, default='M')
    phone_number = models.CharField(max_length=25)
    email = models.EmailField()


class ClinicalRecord(models.Model):
    DISEASE_OPTION = [
        ('E', 'Eye'),
        ('S', 'Skin')
    ]
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    family_history = models.CharField(max_length=255, blank=True)
    blood_type = models.CharField(max_length=30, blank=True)
    pregnancy_condition = models.BooleanField()
    symptoms = models.CharField(max_length=255, blank=True)
    symptoms_description = models.TextField(blank=True)
    disease_type = models.CharField(max_length=1, choices=DISEASE_OPTION, default='E')
    disease_description = models.TextField(blank=True)
    follow_up_information = models.TextField(blank=True)
    image_path = models.CharField(max_length=255, blank=True)
    model_result = models.CharField(max_length=255, blank=True)


class TechnicalReport(models.Model):
    clinical_record = models.ForeignKey(ClinicalRecord, on_delete=models.PROTECT)
    disease_level = models.IntegerField()
    technician = models.ForeignKey(Technician, on_delete=models.PROTECT)
    result_description = models.TextField()
    prescription = models.TextField(blank=True)











