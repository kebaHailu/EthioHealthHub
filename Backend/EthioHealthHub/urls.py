
from django.contrib import admin
from django.urls import path, include
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions
from rest_framework_swagger.views import get_swagger_view

from core.views import CustomTokenObtainPairView
# from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


schema_view = get_schema_view(
    openapi.Info(
        title="Ethio Health Hub",
        default_version='v1',
        contact=openapi.Contact(email="kibromhailu.5513@gmail.com"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
<<<<<<< HEAD
    path('auth/jwt/create', CustomTokenObtainPairView.as_view(), name='custom_token_obtain_pair'),
=======
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('auth/jwt/create/', CustomTokenObtainPairView.as_view(), name='custom_token_obtain_pair'),
>>>>>>> dca9db31f23aaa364c554728430b0c11a30df8a1
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('', include('specialist.urls')),

]


