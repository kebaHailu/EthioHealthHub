import string


from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TechnicianSerializer, ClinicalRecordSerializer, PatientSerializer
from .models import Technician, ClinicalRecord, Patient
import random
from django.contrib.auth.tokens import PasswordResetTokenGenerator as prtg
from django.conf import settings
from user.models import User
from station.models import Station
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags


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
        station_name = Station.objects.get(id=station_id).name
        username = request.data.get('username', email.split('@')[0])
        password_created = generate_password()
        password = request.data.get('password', password_created)
        user = User.objects.create_user(username=username, email=email, password=password)
        technician = Technician.objects.create(
            user=user, station_id=station_id
        )

        current_site = 'localhost:5173/login'
        email_subject = 'complete your account registration'

        # render html
        context = {
            'link':current_site,
            'password': password,
            'username': username,
            'clinic_name':station_name

        }
        html_message = render_to_string('registration_email.html', context)
        text_message = strip_tags(html_message)
        email = EmailMultiAlternatives(email_subject, text_message, settings.DEFAULT_FROM_EMAIL, [email])
        email.attach_alternative(html_message, 'text/html')
        email.send()
        return Response({'message':'Registation email sent'})
    else:
        return Response({'message':'Email address is requried'})