import string
from rest_framework import viewsets, generics, status
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from .serializers import (TechnicianSerializer, ClinicalRecordSerializer, PatientSerializer,
                          MachineLearningModelSerializer, DefaultClinicalRecordSerializer)

from .models import Technician, ClinicalRecord, Patient, MachineLearningModel
import random
from django.contrib.auth.tokens import PasswordResetTokenGenerator as prtg
from django.conf import settings
from user.models import User
from station.models import Station
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.shortcuts import get_object_or_404
from . import machine_learning as ml


class ClinicalRecordViewset(viewsets.ModelViewSet):
    queryset = ClinicalRecord.objects.all()
    serializer_class = ClinicalRecordSerializer
    def create(self, request, *args, **kwargs):
        patient_id = request.data.get('patient')
        clinical_record = ClinicalRecord.objects.filter(patient_id=patient_id).first()

        if clinical_record:
          return Response({"detail": "A clinical record for this patient already exists."},
                            status=status.HTTP_400_BAD_REQUEST)

        return super().create(request, *args, **kwargs)



 

class PatientViewset(viewsets.ModelViewSet):
    queryset = Patient.objects.order_by('-created_at')
    serializer_class = PatientSerializer


class TechnicianViewset(viewsets.ModelViewSet):
    queryset = Technician.objects.all()
    serializer_class = TechnicianSerializer

    # To make the following code functional we have to know who the station is
    # @action(detail=False, methods=['GET', 'PUT'])
    # def profile(self, request):
    #     if request.user.user_role != 'HO':
    #         return Response({'message': 'Invalid user access'}, status=status.HTTP_400_BAD_REQUEST)
    #
    #     health_officer, status_result = Technician.objects.get_or_create(user=request.user)
    #
    #     if request.method == "GET":
    #         serializer = TechnicianSerializer(health_officer)
    #         return Response(serializer.data)
    #
    #     elif request.method == "PUT":
    #         serializer = TechnicianSerializer(health_officer, data=request.data)
    #         serializer.is_valid(raise_exception=True)
    #         serializer.save()
    #         return Response(serializer.data)
    #
    #     return Response(status=status.HTTP_400_BAD_REQUEST)


class MachineLearningModelViewSet(viewsets.ModelViewSet):
    serializer_class = MachineLearningModelSerializer
    queryset = MachineLearningModel.objects.all()

    def create(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # get the image and clinical info from the request data
        image = request.data.get("image"),
        clinical_record_id = request.data.get("clinical_record")
        clinical_record = get_object_or_404(ClinicalRecord, pk=clinical_record_id)

        if serializer.is_valid():
            image = serializer.validated_data['image']

            if clinical_record.disease_type == 'E':
                preprocessed_image = ml.preprocess_image_for_eye(image)
                result, accuracy = ml.predict_with_eye_model(preprocessed_image)

            elif clinical_record.disease_type == 'S':
                preprocessed_image = ml.preprocess_image_for_skin(image)
                result, accuracy = ml.predict_with_skin_model(preprocessed_image)

            else:
                return Response("Invalid image type", status=status.HTTP_400_BAD_REQUEST)

            # response for both models
            instance = serializer.save(clinical_record=clinical_record, image=preprocessed_image, accuracy=accuracy,
                                       result=result)

            patient = get_object_or_404(Patient, pk=clinical_record.patient_id)
            serialized_patient = PatientSerializer(patient).data
            serialized_clinical_record = DefaultClinicalRecordSerializer(clinical_record).data
            response_data = {
                'result': result,
                'clinical_record_id': clinical_record_id,
                'accuracy': accuracy,
                'id': instance.id,
                'patient': serialized_patient,
                'clinical_record': serialized_clinical_record
            }
            header = self.get_success_headers(serializer.data)
            return Response(response_data, status=status.HTTP_201_CREATED, headers=header)

        return Response("The request has some error", status=status.HTTP_400_BAD_REQUEST)


def generate_password():
    characters = string.ascii_letters + string.digits
    password = ''.join(random.choice(characters) for _ in range(8))
    return password


@api_view(['POST'])
def send_registration_email(request):
    email = request.data.get('email')
    if email:
        station_id = request.data.get('station_id')
        station_name = Station.objects.get(id=station_id).name
        username = request.data.get('username', email.split('@')[0])
        password_created = generate_password()
        password = request.data.get('password', password_created)
        user = User.objects.create_user(username=username, email=email, password=password, user_role='HO')
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
            'clinic_name': station_name
        }

        html_message = render_to_string('registration_email.html', context)
        text_message = strip_tags(html_message)
        email = EmailMultiAlternatives(email_subject, text_message, settings.DEFAULT_FROM_EMAIL, [email])
        email.attach_alternative(html_message, 'text/html')
        email.send()
        return Response({'message':'Registation email sent'})
    else:
        return Response({'message':'Email address is requried'})