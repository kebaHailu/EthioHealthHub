from django.urls import path
from django.urls.conf import include
from rest_framework.routers import SimpleRouter, DefaultRouter
from . import views

router = SimpleRouter()
router.register('patient', views.PatientViewset)
router.register('clinical-record', views.ClinicalRecordViewset)
router.register('technician', views.TechnicianViewset, 'technician')
router.register('machine-learning-retrieve', views.MachineLearningModelViewSet, 'machine-learning-retrieve')
router.register('machine-learning', views.MachineLearningModelCreateViewSet, 'machine-learning')

urlpatterns = [
    path('', include(router.urls)),
    path('send_email', views.send_registration_email),
    path('clinical_record/technician',
         views.ClinicalRecordViewByTechnician.as_view(), name='clinical_record-technician'),
    path('technician/profile',
         views.TechnicianProfileViewSet.as_view(), name='technician-profile'),

]
