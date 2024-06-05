import string
from rest_framework import viewsets, generics, status, mixins

from rest_framework.decorators import api_view
from rest_framework.response import Response

from specialist.models import Specialist
from .serializers import (TechnicianSerializer, ClinicalRecordSerializer, TechnicalReportSerializer,
                          PatientSerializer, MachineLearningModelCreateSerializer,
                          MachineLearningModelSerializer, DefaultClinicalRecordSerializer)

from .models import Technician, ClinicalRecord, Patient, MachineLearningModel, TechnicalReport
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


class PatientViewSetByTechnicain(generics.ListAPIView):
    serializer_class = PatientSerializer

    def get_queryset(self):
        user = self.request.user
        return Patient.objects.filter(technician__user_id=user.id).order_by('-created_at')


class ClinicalRecordViewByTechnician(generics.ListAPIView):
    serializer_class = ClinicalRecordSerializer

    def get_queryset(self):
        user = self.request.user
        return ClinicalRecord.objects.filter(patient__technician__user_id=user.id).order_by('-created_at')


class SpecialistClinicalRecordAPIView(generics.ListAPIView):
    serializer_class = ClinicalRecordSerializer

    def get_queryset(self):
        user = self.request.user
        specialist = Specialist.objects.get(user=user)
        return ClinicalRecord.objects.filter(appointment__specialist_id=specialist.id).order_by('-created_at')

class TechnicalReportViewSet(viewsets.ModelViewSet):
    serializer_class = TechnicalReportSerializer
    def get_queryset(self):
        user = self.request.user
        return TechnicalReport.objects.filter(technician__user_id=user.id)

class TechnicianViewset(viewsets.ModelViewSet):
    serializer_class = TechnicianSerializer
    def get_queryset(self):
        user = self.request.user
        return Technician.objects.filter(station__user_id=user.id).order_by('-user__date_joined')


class TechnicianProfileViewSet(generics.UpdateAPIView, generics.RetrieveAPIView):
    serializer_class = TechnicianSerializer
    def get_object(self):
        user = self.request.user
        technician = Technician.objects.get(user_id=user.id)
        return technician


class MachineLearningModelViewSet(mixins.RetrieveModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = MachineLearningModelSerializer
    # queryset = MachineLearningModel.objects.all()
    def get_queryset(self):
        user = self.request.user
        technician = Technician.objects.get(user_id=user.id)
        print(user.id, technician.id)
        return MachineLearningModel.objects.filter(
            clinical_record__patient__technician_id=technician.id).order_by('-created_at')


class MachineLearningModelCreateViewSet(mixins.CreateModelMixin, mixins.UpdateModelMixin, viewsets.GenericViewSet):
    serializer_class = MachineLearningModelCreateSerializer
    queryset = MachineLearningModel.objects.all().order_by('-created_at')

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
                result, accuracy = ml.predict_with_eye_model(image)

            elif clinical_record.disease_type == 'S':

                result, accuracy = ml.predict_with_skin_model(image)

            else:
                return Response("Invalid image type", status=status.HTTP_400_BAD_REQUEST)

            # response for both models
            instance = serializer.save(clinical_record=clinical_record, image=image, accuracy=accuracy,
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
 

@api_view(['POST'])
def machine_learning_test(request):
    image = request.FILES.get('image')
    disease_type = request.data.get('diseaseType')
    if disease_type == 'E':
        result, accuracy = ml.predict_with_eye_model(image)

    elif disease_type == 'S':
        result, accuracy = ml.predict_with_skin_model(image)

    else:
        
        return Response(disease_type, status=status.HTTP_400_BAD_REQUEST)

    return Response({'result': result, 'accuracy': accuracy}, status=status.HTTP_202_ACCEPTED)



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
            'link': current_site,
            'password': password,
            'username': username,
            'clinic_name': station_name
        }

        html_message = render_to_string('registration_email.html', context)
        text_message = strip_tags(html_message)
        email = EmailMultiAlternatives(email_subject, text_message, settings.DEFAULT_FROM_EMAIL, [email])
        email.attach_alternative(html_message, 'text/html')
        email.send()
        return Response({'message': 'Registation email sent'})
    else:
        return Response({'message': 'Email address is requried'})