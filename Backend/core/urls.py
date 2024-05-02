from django.urls import path
from django.urls.conf import include
from rest_framework.routers import SimpleRouter, DefaultRouter
from . import views

router = SimpleRouter()
router.register('appointment', views.AppointmentViewSet)

urlpatterns = [
    path('', include(router.urls)),

]

