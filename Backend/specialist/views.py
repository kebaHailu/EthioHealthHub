from django.db.models.aggregates import Count
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework.mixins import ListModelMixin, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.viewsets import GenericViewSet
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import generics
# from rest_framework.viewsets import ModelViewSet
from rest_framework import status
from core.models import User
# from .filters import ProductFilter
from .models import Specialist, Education, Experience
from .serializers import SpecialistSerializer, EducationSerializer, ExperienceSerializer

# Create your views here.


# class SpecialistViewSet(CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
#     queryset = Specialist.objects.all()
#     serializer_class = SpecialistSerializer
#
#
#     @action(detail=False, methods=['GET', 'PUT'])
#     def me(self, request):
#         specialist, status_result = Specialist.objects.get_or_create(user_id = request.user.id)
#         if request.method == "GET":
#             serializer = SpecialistSerializer(specialist)
#             return Response(serializer.data)
#         elif request.method == "PUT":
#             serializer = SpecialistSerializer(specialist, data=request.data)
#             serializer.is_valid(raise_exception=True)
#             serializer.save()
#             return Response(serializer.data)
#
#         return Response(request.user.user_role)
#

"""
:use the following format to create the end point:

"""
class SpecialistCreateView(generics.ListCreateAPIView):
    queryset = Specialist.objects.all()
    serializer_class = SpecialistSerializer

    def perform_create(self, serializer, req):
        specialist_profile = serializer.save()

        # ... Handle education data ...
        education_data = req.get('education')

        # Associate the specialist_profile ID with each education item
        if education_data:
            education_data = [dict(item, profile=specialist_profile.id) for item in education_data]
            education_serializer = EducationSerializer(data=education_data, many=True)
            education_serializer.is_valid(raise_exception=True)
            education_serializer.save(profile=specialist_profile)

        # ... Handle experience data ...
        experience_data = req.get('experience')

        # Associate the specialist_profile ID with each experience item
        if experience_data:
            experience_data = [dict(item, profile=specialist_profile.id) for item in experience_data]
            experience_serializer = ExperienceSerializer(data=experience_data, many=True)
            experience_serializer.is_valid(raise_exception=True)
            experience_serializer.save(profile=specialist_profile)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def create(self, request, *args, **kwargs):
        user = request.data.get('user')
        try:
            user_instance = User.objects.get(id=user)
        except User.DoesNotExist:
            return Response(f"User with ID {user} does not exist", status=status.HTTP_404_NOT_FOUND)
        specialist_data = dict(request.data, user=user_instance.id)
        serializer = self.get_serializer(data=specialist_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer, request.data)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class SpecialistRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Specialist.objects.all()
    serializer_class = SpecialistSerializer

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        # Update the specialist data
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        # ... Handle education data ...
        education_data = request.data.get('education')

        # Associate the specialist_profile ID with each education item
        if education_data:
            education_data = [dict(item, profile=instance.id) for item in education_data]
            education_serializer = EducationSerializer(data=education_data, many=True)
            education_serializer.is_valid(raise_exception=True)
            education_serializer.save(profile=instance)

        # ... Handle experience data ...
        experience_data = request.data.get('experience')

        # Associate the specialist_profile ID with each experience item
        if experience_data:
            experience_data = [dict(item, profile=instance.id) for item in experience_data]
            experience_serializer = ExperienceSerializer(data=experience_data, many=True)
            experience_serializer.is_valid(raise_exception=True)
            experience_serializer.save(profile=instance)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)


# class EducationViewset(ListModelMixin, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
#     queryset = Education.objects.all()
#     serializer_class = EducationSerializer
#
#
# class ExperienceViewset(ListModelMixin, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
#     queryset = Experience.objects.all()
#     serializer_class = ExperienceSerializer
#
