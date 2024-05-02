from django.contrib import admin

from technician.models import Technician, ClinicalRecord, Patient


# Register your models here.


@admin.register(Technician)
class TechnicianAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email')


@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email')
@admin.register(ClinicalRecord)
class ClinicalRecordAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name')