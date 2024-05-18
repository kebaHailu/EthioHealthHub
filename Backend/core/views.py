from django.shortcuts import render
from rest_framework import viewsets, generics
from django.shortcuts import get_object_or_404
from .models import Appointment, Prescription
from technician.models import Patient, Technician, ClinicalRecord
from specialist.models import Specialist
from datetime import datetime
from .serializers import AppointmentSerializer, AppointmentGetSerializer, PrescriptionSerializer, AppointmentDetailSerializer
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings
class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

    def perform_create(self, serializer):

        # patient access
        clinical_record_id = self.request.data.get('clinical_record')
        clinical_record = get_object_or_404(ClinicalRecord, pk= clinical_record_id)

        patient_id = clinical_record.patient_id
        patient = get_object_or_404(Patient, pk=patient_id)

        app_date = self.request.data.get('appointment_date')
        appointment_datetime = datetime.strptime(app_date, '%Y-%m-%dT%H:%M')
        appointment_date = appointment_datetime.date()
        appointment_time = appointment_datetime.time()
        message = self.request.data.get('message')
        technician_id = self.request.data.get('technician')
        technician = get_object_or_404(Technician, pk=technician_id)
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
    queryset = Prescription.objects.all()
    serializer_class = PrescriptionSerializer


class SpecialistAppointmentAPIView(generics.ListAPIView):
    serializer_class = AppointmentGetSerializer

    def get_queryset(self):
        specialist_id = self.kwargs['specialist_id']
        return Appointment.objects.filter(specialist__user_id=specialist_id)


class StationAppointmentAPIView(generics.ListAPIView):
    serializer_class = AppointmentGetSerializer
    def get_queryset(self):
        station_id = self.kwargs['station_id']
        return Appointment.objects.filter(technician__station__user_id=station_id)


class AppointmentDetailAPIView(generics.RetrieveAPIView):
    serializer_class = AppointmentDetailSerializer
    queryset = Appointment.objects.all()
    lookup_field = 'id'


