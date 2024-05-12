from django.db.models.aggregates import Count
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework.mixins import ListModelMixin, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.viewsets import GenericViewSet
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
# from rest_framework.response import Response
# from rest_framework.viewsets import ModelViewSet
from rest_framework import status
# from .filters import ProductFilter
from .models import Specialist
from .serializers import SpecialistSerializer

# Create your views here.


class SpecialistViewSet(ListModelMixin, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
    queryset = Specialist.objects.all()
    serializer_class = SpecialistSerializer

    @action(detail=False, methods=['GET', 'PUT'])
    def me(self, request):
        specialist, status_result = Specialist.objects.get_or_create(user_id = request.user.id)
        if request.method == "GET":
            serializer = SpecialistSerializer(specialist)
            return Response(serializer.data)
        elif request.method == "PUT":
            serializer = SpecialistSerializer(specialist, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)

        return Response(request.user.user_role)
        # if request.user.user_role == 'SD':
        #     special = Specialist.objects.get_or_create(user_id=request.user.id)


