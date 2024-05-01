from django.contrib import admin
from specialist.models import Specialist, Education, Experience


# Register your models here.


class EudationInline(admin.StackedInline):
    model = Education


class ExperienceInline(admin.StackedInline):
    model = Experience


@admin.register(Specialist)
class SpecialistAdmin(admin.ModelAdmin):
    list_select_related = ['user']
    list_display = ('first_name', 'last_name', 'email')
    search_fields = ('first_name', 'email')
    inlines = [EudationInline, ExperienceInline]

    

