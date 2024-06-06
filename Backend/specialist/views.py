from django.db.models.aggregates import Count
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework.mixins import ListModelMixin, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.viewsets import GenericViewSet
from rest_framework.decorators import action
import pprint
from rest_framework.filters import SearchFilter, OrderingFilter
# from rest_framework.response import Response
# from rest_framework.viewsets import ModelViewSet
from rest_framework import status
# from .filters import ProductFilter
from .models import Specialist
from .serializers import SpecialistSerializer

# Create your views here.


class SpecialistViewSet(ListModelMixin, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
    queryset = Specialist.objects.all().order_by('-user__date_joined')
    serializer_class = SpecialistSerializer

    # def perform_create(self, serializer):
    #     # Check if the Specialist table exists for the user
    #     if Specialist.objects.filter(user=self.request.user).exists():
    #         # If the Specialist table exists, update the existing instance
    #         specialist_instance = Specialist.objects.get(user=self.request.user)
    #         serializer.save(instance=specialist_instance)
    #     else:
    #         # If the Specialist table doesn't exist, create a new instance
    #         serializer.save(user=self.request.user)

    @action(detail=False, methods=['GET', 'PUT'])
    def profile(self, request):
        if request.user.user_role != 'SD':
            return Response({'message': 'Invalid user access'}, status=status.HTTP_400_BAD_REQUEST)

        specialist, status_result = Specialist.objects.get_or_create(user=request.user)

        if request.method == "GET":
            serializer = SpecialistSerializer(specialist)
            return Response(serializer.data)

        elif request.method == "PUT":
            serializer = SpecialistSerializer(specialist, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)

        return Response(request.user.user_role)

