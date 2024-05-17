from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
# from rest_framework.response import Response
from .serializers import TechnicianSerializer, ClinicalRecordSerializer, PatientSerializer
from .models import Technician, ClinicalRecord, Patient
from pprint import pprint
from django.http import request, response


class ClinicalRecordViewset(ModelViewSet):
    queryset = ClinicalRecord.objects.all()
    serializer_class = ClinicalRecordSerializer
    def create(self, request, *args, **kwargs):
        patient_id = request.data.get('patient')
        clinical_record = ClinicalRecord.objects.filter(patient_id=patient_id).first()

        if clinical_record:
          return Response({"detail": "A clinical record for this patient already exists."},
                            status=status.HTTP_400_BAD_REQUEST)

        return super().create(request, *args, **kwargs)


class PatientViewset(ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer


class TechnicianViewset(ModelViewSet):
    queryset = Technician.objects.all()
    serializer_class = TechnicianSerializer

