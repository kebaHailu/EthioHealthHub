from django.shortcuts import render

# Create your views here.
class EducationViewset(ListModelMixin, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer
