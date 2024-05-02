from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from specialist.models import Specialist
from technician.models import ClinicalRecord, Patient, Technician


class User(AbstractUser):

    USER_TYPE_CHOICES = (
        ('SD', 'Specialist Doctor'),
        ('HO', 'Health Officer'),
        ('SA', 'Station Administrator')

    )
    email = models.EmailField(unique=True)
    user_role = models.CharField(max_length=2, choices=USER_TYPE_CHOICES, default='SD')


class Appointment(models.Model):
    clinical_record = models.OneToOneField(ClinicalRecord, on_delete=models.CASCADE)
    technician = models.ForeignKey(Technician, on_delete=models.CASCADE)
    specialist = models.ForeignKey(Specialist, on_delete=models.CASCADE)
    appointment_date = models.DateTimeField()
    message = models.TextField()
    status = models.BooleanField(default=False)

    def get_patient(self):
        return self.clinical_record.patient.first_name + " " + self.clinical_record.patient.last_name







