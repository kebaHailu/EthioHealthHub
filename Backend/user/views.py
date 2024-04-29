from django.shortcuts import render
from .models import CustomUser
from rest_framework import generics
from .serializers import CustomUserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
# Create your views here.

class CreateUserView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUser
    permission_classes = [AllowAny]
