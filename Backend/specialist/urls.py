from django.urls import path
from django.urls.conf import include
from rest_framework.routers import SimpleRouter, DefaultRouter
from . import views

# router = SimpleRouter()
# router.register('profile', views.SpecialistViewSet)
# router.register('education', views.EducationViewset)
# router.register('experience', views.ExperienceViewset)
# router.register('special', views.SpecialistCreateView.as_view(), basename='specialist-create')

urlpatterns = [
    # path('', include(router.urls)),
    path('profiles/', views.SpecialistCreateView.as_view(), name='profiles'),
    path('profiles/<pk>', views.SpecialistRetrieveUpdateDestroyView.as_view(), name='profiles'),

]

