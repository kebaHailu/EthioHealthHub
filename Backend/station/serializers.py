from rest_framework.serializers import ModelSerializer

from station.models import Station


class StationSerializer(ModelSerializer):
    class Meta:
        model = Station
        exclude = ['is_approved', 'approved_by']