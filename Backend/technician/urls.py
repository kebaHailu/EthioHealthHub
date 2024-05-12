from django.urls import path
from django.urls.conf import include
from rest_framework.routers import SimpleRouter, DefaultRouter
from . import views

router = SimpleRouter()
router.register('patient', views.PatientViewset)
router.register('clinical-record', views.ClinicalRecordViewset)
router.register('technician', views.TechnicianViewset)

urlpatterns = [
    path('', include(router.urls)),

]
