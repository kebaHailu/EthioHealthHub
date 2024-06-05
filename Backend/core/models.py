from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from specialist.models import Specialist
from technician.models import ClinicalRecord, Patient, Technician, MachineLearningModel

class Appointment(models.Model):
    clinical_record = models.OneToOneField(ClinicalRecord, on_delete=models.DO_NOTHING)
    technician = models.ForeignKey(Technician, on_delete=models.DO_NOTHING, blank=True)
    specialist = models.ForeignKey(Specialist, on_delete=models.DO_NOTHING)
    appointment_date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    message = models.TextField()
    status = models.BooleanField(default=False)

    def __str__(self):
        return self.message



    def __str__(self):
        return self.message


class Prescription(models.Model):
    appointment = models.ForeignKey(Appointment, on_delete=models.DO_NOTHING)
    prescription_medicine = models.CharField(max_length=300)
    follow_update = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    archived = models.BooleanField(default=False)





