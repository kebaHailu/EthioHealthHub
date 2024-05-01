from django.contrib import admin

from specialist.models import Specialist, Education, Experience


# Register your models here.


class EudationInline(admin.StackedInline):
    model = Education


class ExperienceInline(admin.StackedInline):
    model = Experience


@admin.register(Specialist)
class SpecialistAdmin(admin.ModelAdmin):
    list_display = ('get_first_name', 'get_last_name', 'get_email')
    search_fields = ('get_first_name', 'get_email')
    inlines = [EudationInline, ExperienceInline]

    def get_first_name(self,obj):
        return obj.user.first_name

    def get_last_name(self, obj):
        return obj.user.last_name

    def get_email(self, obj):
        return obj.user.email
