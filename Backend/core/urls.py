from django.urls import path
from django.urls.conf import include
from rest_framework.routers import SimpleRouter, DefaultRouter
from . import views

router = SimpleRouter()
router.register('appointment', views.AppointmentViewSet)
router.register('prescription', views.PrescriptionViewSet)
urlpatterns = [
    path('appointemnts/specialist/<int:specialist_id>',
         views.SpecialistAppointmentAPIView.as_view(), name='specialist-appointments'),
    path('appointemnts/station/<int:station_id>',
         views.StationAppointmentAPIView.as_view(), name='station-appointments'),
    path('', include(router.urls)),

]

