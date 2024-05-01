from django.db.models.aggregates import Count
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.mixins import ListModelMixin, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.viewsets import GenericViewSet
from rest_framework.filters import SearchFilter, OrderingFilter
# from rest_framework.response import Response
# from rest_framework.viewsets import ModelViewSet
from rest_framework import status
# from .filters import ProductFilter
from .models import Specialist, Education, Experience
from .serializers import SpecialistSerializer, EducationSerializer, ExperienceSerializer

# Create your views here.

class SpecialistViewSet(ListModelMixin, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
    queryset = Specialist.objects.all()
    serializer_class = SpecialistSerializer

class EducationViewset(ListModelMixin, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer
    
class ExperienceViewset(ListModelMixin, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer
   
