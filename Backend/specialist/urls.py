from django.urls import path
from django.urls.conf import include
from rest_framework.routers import SimpleRouter, DefaultRouter
from . import views

router = SimpleRouter()
router.register('profile', views.SpecialistViewSet)
router.register('education', views.EducationViewset)
router.register('experience', views.ExperienceViewset)

urlpatterns = [
    path('', include(router.urls)),

]

