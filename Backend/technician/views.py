from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .serializers import TechnicianSerializer, ClinicalRecordSerializer, PatientSerializer
from .models import Technician, ClinicalRecord, Patient


class ClinicalRecordViewset(ModelViewSet):
    queryset = ClinicalRecord.objects.all()
    serializer_class = ClinicalRecordSerializer


class PatientViewset(ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer


class TechnicianViewset(ModelViewSet):
    queryset = Technician.objects.all()
    serializer_class = TechnicianSerializer