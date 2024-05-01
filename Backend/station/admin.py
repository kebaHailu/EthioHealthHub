from django.contrib import admin

from station.models import Station


@admin.register(Station)
class StationAdmin(admin.ModelAdmin):
    list_display = ('name', 'location')
    search_fields = ('name',)