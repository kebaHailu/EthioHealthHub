from django.urls import path
from django.urls.conf import include
from rest_framework.routers import SimpleRouter, DefaultRouter
from . import views

router = SimpleRouter()
router.register('Specialist', views.SpecialistViewSet)
router.register('Education', views.EducationViewset)
router.register('Experience', views.ExperienceViewset)

urlpatterns = router.urls

