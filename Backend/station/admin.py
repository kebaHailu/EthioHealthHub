from django.contrib import admin

from station.models import Station


# Register your models here.
@admin.register(Station)
class StationAdmin(admin.ModelAdmin):
    list_display = ('name', 'location', 'admin_name')
    search_fields = ('name')
