from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseAdmin
from .models import User, Appointment

# Register your models here.


@admin.register(User)
class UserAdmin(BaseAdmin):
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("first_name", "last_name", "email", "username", "password1", "password2"),
            },
        ),
    )



@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ("status",)