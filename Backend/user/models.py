from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models


class User(AbstractUser):

    USER_TYPE_CHOICES = (
        ('SD', 'Specialist Doctor'),
        ('HO', 'Health Officer'),
        ('SA', 'Station Administrator')

    )
    email = models.EmailField(unique=True)
    user_role = models.CharField(max_length=2, choices=USER_TYPE_CHOICES, default='SD')




