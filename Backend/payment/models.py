from django.db import models
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey

# Create your models here.

class Payment(models.Model):

    STATUS = [
        ('P', 'Pending'),
        ('C', 'Complete'),
        ('IN', 'Incomplete'),
    ]

    current_status = models.CharField(max_length=2, choices=STATUS, default='P')
    payment = models.BooleanField(default=False)
    prescription_status = models.CharField(max_length=255, null=True, blank=True)
    creation_date = models.DateField(auto_now=True)
    tracking = models.CharField(max_length=255)

class Billing(models.Model):
    content_type=models.ForeignKey(ContentType,on_delete=models.CASCADE)
    object_id=models.PositiveBigIntegerField()
    doctor_id = GenericForeignKey()
    payment_type = models.CharField(max_length=255)
    billing_detail = models.IntegerField()

class Appointment(models.Model):
    content_type=models.ForeignKey(ContentType,on_delete=models.CASCADE)
    object_id=models.PositiveBigIntegerField()
    doctor_id = GenericForeignKey()
    appointment_date = models.DateField(auto_now=True)
    booking_date = models.TimeField(auto_now=True)
    appointment_status = models.CharField(max_length=255, null=True, blank=True)
    place_of_meeting = models.CharField(max_length = 255)
    meeting_link = models.CharField(max_length = 255)
    payment_id = models.OneToOneField(Payment, on_delete=models.CASCADE, null=True)


class BillingDetail(models.Model):
    created_card = models.CharField(max_length=255)
    order_number = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    doctor_fee = models.IntegerField()
    vat = models.DecimalField(max_digits=5, decimal_places=2)
    discount = models.IntegerField()
    other_info = models.TextField()


class Prescription(models.Model):
    appointment_id = models.OneToOneField(Appointment, on_delete = models.CASCADE)
    follow_update = models.DateTimeField(auto_now=True)
    action = models.CharField(max_length=255, null=True, blank=True)
    archived = models.CharField(max_length=255, null=True, blank=True)
    disease = models.CharField(max_length=255, null=True, blank=True)




        
 
