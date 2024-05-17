import string

from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TechnicianSerializer, ClinicalRecordSerializer, PatientSerializer
from .models import Technician, ClinicalRecord, Patient
from pprint import pprint
import random
from django.http import request, response
from django.contrib.auth.tokens import PasswordResetTokenGenerator as prtg
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from django.core.mail import send_mail
from django.conf import settings
from user.models import User

class ClinicalRecordViewset(ModelViewSet):
    queryset = ClinicalRecord.objects.all()
    serializer_class = ClinicalRecordSerializer


class PatientViewset(ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer


class TechnicianViewset(ModelViewSet):
    queryset = Technician.objects.all()
    serializer_class = TechnicianSerializer


def generate_password():
    characters = string.ascii_letters + string.digits
    password = ''.join(random.choice(characters) for _ in range(8))
    return password


def generate_registration_token(email):
    token_generator = prtg()
    return token_generator.make_token(email)

@api_view(['POST'])
def send_registration_email(request):
    email = request.data.get('email')

    if email:
        station_id = request.data.get('station_id')

        username = request.data.get('username', email.split('@')[0])
        password_created = generate_password()
        password = request.data.get('password', password_created)
        user = User.objects.create_user(username=username, email=email, password=password)
        technician = Technician.objects.create(
            user=user, station_id=station_id
        )

        current_site = 'https://localhost:5173/login'
        email_subject = 'complete your account registration'
        email_message = f'Your current username is {username} and your password is {password}. login using the link {current_site} and Change your username and  password'
        send_mail(email_subject, email_message, settings.DEFAULT_FROM_EMAIL, [email])
        return Response({'message':'Registation email sent'})
    else:
        return Response({'message':'Email address is requried'})