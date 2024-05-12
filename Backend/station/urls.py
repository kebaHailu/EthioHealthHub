from django.urls import path
from django.urls.conf import include
from rest_framework.routers import SimpleRouter
from . import views

router = SimpleRouter()
router.register('station', views.StationViewSet)

urlpatterns = [
    path('', include(router.urls)),

]

