from django.urls import path

from . import views


urlpatterns = [
    path('register/', views.RegisterApiView.as_view(), name='api-register'),
    path('login/', views.LoginApiView.as_view(), name='api-login'),
]
