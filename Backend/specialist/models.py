from django.db import models

# Create your models here.

class Specialist(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length= 25)
    date_of_birth = models.DateField()
    about_me = models.TextField()
