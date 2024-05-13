from django.shortcuts import render
from rest_framework import viewsets
from .models import Appointment, Prescription
from .serializers import AppointmentSerializer, PrescriptionSerializer


class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer


class PrescriptionViewSet(viewsets.ModelViewSet):
    queryset = Prescription.objects.all()
    serializer_class = PrescriptionSerializer

