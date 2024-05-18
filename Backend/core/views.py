from django.shortcuts import render
from rest_framework import viewsets, generics
from .models import Appointment, Prescription
from .serializers import AppointmentSerializer, PrescriptionSerializer


class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer


class PrescriptionViewSet(viewsets.ModelViewSet):
    queryset = Prescription.objects.all()
    serializer_class = PrescriptionSerializer


class SpecialistAppointmentAPIView(generics.ListAPIView):
    serializer_class = AppointmentSerializer

    def get_queryset(self):
        specialist_id = self.kwargs['specialist_id']
        return Appointment.objects.filter(specialist__user_id=specialist_id)


class StationAppointmentAPIView(generics.ListAPIView):
    serializer_class = AppointmentSerializer
    def get_queryset(self):
        station_id = self.kwargs['station_id']
        return Appointment.objects.filter(technician__station__user_id=station_id)

