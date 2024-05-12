from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseAdmin
from .models import User
# Register your models here.





@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ("status",)