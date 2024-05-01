from django.db import models
from django.conf import settings
# Create your models here.


class Station(models.Model):
    name = models.CharField(max_length=255)
    admin_name = models.CharField(max_length=255)
    cover_image = models.CharField(max_length=255, null=True, blank=True)
    location = models.CharField(max_length=255)
    latitude = models.CharField(max_length=300, null=True, blank=True)
    longitude = models.CharField(max_length=300, null=True, blank=True)
    is_approved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    approved_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING, blank=True, null=True, related_name='approved_stations')
    description = models.TextField()
    password = models.CharField(max_length=500)

