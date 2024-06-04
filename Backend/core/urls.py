from django.urls import path
from django.urls.conf import include
from rest_framework.routers import SimpleRouter, DefaultRouter
from . import views

router = SimpleRouter()
router.register('appointment', views.AppointmentViewSet)
router.register('prescription', views.PrescriptionViewSet)
urlpatterns = [
     
    path('appointments/specialist/<int:specialist_id>',
         views.SpecialistAppointmentAPIView.as_view(), name='specialist-appointments'),
    path('appointments/station/<int:station_id>',
         views.StationAppointmentAPIView.as_view(), name='station-appointments'),
    path('appointment/detail/<int:id>', views.AppointmentDetailAPIView.as_view(), name='appointment-detail'),
    path('prescription/specialist', views.SpecialistPrescriptionViewSet.as_view(), name='specialist-prescription'),
    path('specialist/dashboard', views.SpecialistDashboardView.as_view(), name='dashboard-specialist'),
    path('technician/dashboard', views.TechnicianDashboardView.as_view(), name='dashboard-technician'),
    path('', include(router.urls)),


]

