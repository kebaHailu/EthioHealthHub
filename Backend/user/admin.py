from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseAdmin
from .models import User
# Register your models here.


@admin.register(User)
class UserAdmin(BaseAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'user_role')
    fieldsets = (('personal info', {'fields': ('first_name', 'last_name', 'email', 'user_role')}),)
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("first_name", "last_name", "user_role", "email", "username", "password1", "password2"),
            },
        ),
    )
