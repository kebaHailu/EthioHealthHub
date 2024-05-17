from django.contrib import admin
from specialist.models import Specialist
# Register your models here.
@admin.register(Specialist)
class SpecialistAdmin(admin.ModelAdmin):
    list_select_related = ['user']
    list_display = ('username', 'first_name', 'last_name', 'email')
    search_fields = ('first_name', 'email')

    

