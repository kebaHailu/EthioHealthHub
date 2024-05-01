from django.db.models.aggregates import Count
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework import status---
from .filters import ProductFilter
from .models import specialist, SpecialistProfile, Education, Experience
from .serializers import CollectionSerializer, ProductSerializer, ReviewSerializer

# Create your views here.

class SpecialistProfileViewSet(ModelViewSet):
    queryset = SpecialistProfile.objects.all()
    serializer_class = SpecialistProfileSerializer
    
