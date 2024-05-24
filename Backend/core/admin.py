from django.contrib import admin
from .models import Appointment, Prescription
# Register your models here.


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ("message","specialist","status",)


@admin.register(Prescription)
class PrescriptionAdmin(admin.ModelAdmin):
    list_display = ("appointment",'prescription_medicine', 'follow_update', 'archived')

