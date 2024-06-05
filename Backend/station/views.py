from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .serializers import StationSerializer
from .models import Station
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
# Create your views here.


class StationViewSet(ModelViewSet):
    queryset = Station.objects.all().order_by('-created_at')
    serializer_class = StationSerializer

    @action(detail=False, methods=['GET', 'PUT'])
    def profile(self, request):
        if request.user.user_role != 'SA':
            return Response({'message': 'Invalid user access'}, status=status.HTTP_400_BAD_REQUEST)

        station, status_result = Station.objects.get_or_create(user=request.user)

        if request.method == "GET":
            serializer = StationSerializer(station)
            return Response(serializer.data)

        elif request.method == "PUT":
            serializer = StationSerializer(station, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)

        return Response(request.user.user_role)

