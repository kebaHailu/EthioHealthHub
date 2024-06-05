from django.shortcuts import render
from rest_framework import viewsets, generics, views
from django.shortcuts import get_object_or_404
from rest_framework.response import Response

from .models import Appointment, Prescription
from technician.models import Patient, Technician, ClinicalRecord, MachineLearningModel
from specialist.models import Specialist
from station.models import Station
from datetime import datetime
from .serializers import AppointmentSerializer, AppointmentGetSerializer, PrescriptionSerializer, AppointmentDetailSerializer
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings
from user.models import User
class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all().order_by('-created_at')

    serializer_class = AppointmentSerializer

    def perform_create(self, serializer):

        # patient access
        clinical_record_id = self.request.data.get('clinical_record')
        clinical_record = get_object_or_404(ClinicalRecord, pk=clinical_record_id)

        patient_id = clinical_record.patient_id
        patient = get_object_or_404(Patient, pk=patient_id)

        app_date = self.request.data.get('appointment_date')
        appointment_datetime = datetime.strptime(app_date, '%Y-%m-%dT%H:%M')
        appointment_date = appointment_datetime.date()
        appointment_time = appointment_datetime.time()
        message = self.request.data.get('message')

        user_id = self.request.user.id
        user = get_object_or_404(User, id=user_id)
        technician = get_object_or_404(Technician, user=user)

        # user_id = self.request.data.get('user')
        specialist_id = self.request.data.get('specialist')
        specialist = get_object_or_404(Specialist, pk=specialist_id)

        redirect_link = 'localhost:5173/appointment'
        email_subject = 'New Patient Appointment Arrived'

        # context mapping
        context = {
            'patient_name': patient.first_name + ' ' + patient.last_name,
            'patient_gender': patient.gender,
            'patient_age': patient.age,
            'patient_phone': patient.phone_number,
            'patient_email': patient.email,

            'appointment_date': appointment_date,
            'appointment_time': appointment_time,
            'message': message,
            'technician_name': technician.user.first_name + ' ' + technician.user.last_name,
            'link': redirect_link,
            'doctor_name': specialist.user.first_name + ' ' + specialist.user.last_name
        }

        # email sending
        serializer.save()
        html_message = render_to_string('appointment_email.html', context)
        text_message = strip_tags(html_message)
        email = EmailMultiAlternatives(email_subject, text_message, settings.DEFAULT_FROM_EMAIL, [specialist.user.email])
        email.attach_alternative(html_message, 'text/html')
        email.send()





class PrescriptionViewSet(viewsets.ModelViewSet):
    queryset = Prescription.objects.all().order_by('-created_at')
    serializer_class = PrescriptionSerializer


class SpecialistPrescriptionViewSet(generics.ListAPIView):
    serializer_class = PrescriptionSerializer

    def get_queryset(self):
        user = self.request.user
        return Prescription.objects.filter(appointment__specialist__user_id=user.id).order_by('-created_at')


class SpecialistAppointmentAPIView(generics.ListAPIView):
    serializer_class = AppointmentGetSerializer

    def get_queryset(self):
        specialist_id = self.kwargs['specialist_id']
        return Appointment.objects.filter(specialist__user_id=specialist_id).order_by('-created_at')


class StationAppointmentAPIView(generics.ListAPIView):
    serializer_class = AppointmentGetSerializer
    def get_queryset(self):
        technician_user_id = self.kwargs['station_id']
        return Appointment.objects.filter(technician__user_id=technician_user_id).order_by('-created_at')


class AppointmentDetailAPIView(generics.RetrieveAPIView):
    serializer_class = AppointmentDetailSerializer
    queryset = Appointment.objects.all().order_by('-created_at')
    lookup_field = 'id'

    def get_object(self):
        appointment = super().get_object()
        clinical_record = appointment.clinical_record
        machine_learning_data = MachineLearningModel.objects.filter(clinical_record=clinical_record).values_list('result', flat=True)
        appointment.machine_learning_data = list(machine_learning_data)
        return appointment

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        serialized_data = serializer.data
        serialized_data['machine_learning_data'] = instance.machine_learning_data
        return Response(serialized_data)


# Dashboards
class SpecialistDashboardView(views.APIView):
    def get(self, request):
        user = request.user
        specialist = Specialist.objects.get(user_id=user.id)
        appointments = Appointment.objects.filter(specialist_id=specialist.id)
        prescriptions = Prescription.objects.filter(appointment__specialist_id=specialist.id)
        patients = ClinicalRecord.objects.filter(appointment__specialist_id=specialist.id)
        data = {
            'total_patients': patients.count(),
            'total_appointments': appointments.count(),
            'total_prescriptions': prescriptions.count(),
        }

        return Response(data)


class TechnicianDashboardView(views.APIView):
    def get(self, request):
        user = request.user
        technician = Technician.objects.get(user_id=user.id)
        specialist = Specialist.objects.all()
        appointments = Appointment.objects.filter(technician_id=technician.id)
        patients = ClinicalRecord.objects.filter(patient__technician_id=technician.id)
        stations = Station.objects.all()
        data = {
            'total_specialist': specialist.count(),
            'total_patients': patients.count(),
            'total_appointments': appointments.count(),
            'total_stations': stations.count(),

        }

        return Response(data)

