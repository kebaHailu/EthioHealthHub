from django.contrib import admin
from .models import Patient, Doctor, Address, CustomUser
# Register your models here.


@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name')
    search_fields = ('first_name', 'last_name')


@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):

    list_display = ('first_name', 'last_name')
    search_fields = ('first_name', 'last_name')


@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name')
    search_fields = ('first_name', 'last_name')

