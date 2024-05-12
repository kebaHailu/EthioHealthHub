from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .serializers import StationSerializer
from .models import Station
# Create your views here.


class StationViewSet(ModelViewSet):
    queryset = Station.objects.all()
    serializer_class = StationSerializer

