from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from specialist.models import Specialist
from technician.models import ClinicalRecord, Patient, Technician




class Appointment(models.Model):
    clinical_record = models.OneToOneField(ClinicalRecord, on_delete=models.CASCADE)
    technician = models.ForeignKey(Technician, on_delete=models.CASCADE)
    specialist = models.ForeignKey(Specialist, on_delete=models.CASCADE)
    appointment_date = models.DateTimeField()
    message = models.TextField()
    status = models.BooleanField(default=False)

    # def get_patient(self):
    #     return self.clinical_record.patient.first_name + " " + self.clinical_record.patient.last_name

    def __str__(self):
        return self.message


class Prescription(models.Model):
    appointment = models.ForeignKey(Appointment, on_delete=models.DO_NOTHING)
    prescription_medicine = models.CharField(max_length=300)
    follow_update = models.TextField()
    archived = models.BooleanField(default=False)





