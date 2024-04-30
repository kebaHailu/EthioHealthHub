from django.contrib import admin

from specialist.models import Specialist, SpecialistProfile


# Register your models here.


class SepcialistProfileInline(admin.StackedInline):
    model = SpecialistProfile


@admin.register(Specialist)
class SpecialistAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email')
    search_fields = ('first_name', 'email')
    inlines = [SepcialistProfileInline]
