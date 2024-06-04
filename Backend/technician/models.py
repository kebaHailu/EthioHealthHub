from django.db import models
from django.conf import settings
from station.models import Station


# Create your models here.

class Technician(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    age = models.IntegerField(null=True, blank=True)
    phone_number = models.CharField(max_length=25, null=True, blank=True)
    specialization = models.CharField(max_length=255, null=True, blank=True)
    education = models.TextField(blank=True, null=True)
   
    station = models.ForeignKey(Station, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.first_name + " " + self.user.last_name

    def username(self):
        return self.user.username
    def first_name(self):
        return self.user.first_name

    def last_name(self):
        return self.user.last_name

    def email(self):
        return self.user.email


class Patient(models.Model):
    technician = models.ForeignKey(Technician, on_delete=models.SET_NULL, null=True, blank=True)
    GENDER_OPTION = [
        ('M', 'Male'),
        ('F', 'Female')
    ]

    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    age = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    gender = models.CharField(max_length=1, choices=GENDER_OPTION, default='M')
    phone_number = models.CharField(max_length=25)
    email = models.EmailField()
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    country = models.CharField(max_length=255)

    def __str__(self):
        return self.first_name


class ClinicalRecord(models.Model):
    DISEASE_OPTION = [
        ('E', 'Eye'),
        ('S', 'Skin')
    ]
    patient = models.OneToOneField(Patient, on_delete=models.CASCADE)
    family_history = models.CharField(max_length=255, blank=True)
    blood_type = models.CharField(max_length=30, blank=True)
    pregnancy_condition = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)
    symptoms = models.CharField(max_length=255, blank=True)
    symptoms_description = models.TextField(blank=True)
    disease_type = models.CharField(max_length=1, choices=DISEASE_OPTION, default='E')
    disease_description = models.TextField(blank=True)
    follow_up_information = models.TextField(blank=True)
    image_path = models.ImageField(upload_to="images/", null=True, blank=True)  # Field(max_length=255, blank=True)
    allergies = models.CharField(max_length=255, blank=True)
    vaccination_status = models.CharField(max_length=255, blank=True)
    sugar_level = models.CharField(max_length=255, blank=True)
    blood_pressure = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.patient.first_name + " " + self.patient.last_name

    def first_name(self):
        return self.patient.first_name

    def last_name(self):
        return self.patient.last_name


class TechnicalReport(models.Model):
    clinical_record = models.ForeignKey(ClinicalRecord, on_delete=models.PROTECT)
    disease_level = models.IntegerField()
    technician = models.ForeignKey(Technician, on_delete=models.PROTECT)
    result_description = models.TextField()
    prescription = models.TextField(blank=True)


class MachineLearningModel(models.Model):

    clinical_record = models.ForeignKey(ClinicalRecord, on_delete=models.DO_NOTHING)
    image = models.ImageField(upload_to="images/")
    result = models.CharField(max_length=200, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    accuracy = models.DecimalField(max_digits=5, decimal_places=2, default=0)










