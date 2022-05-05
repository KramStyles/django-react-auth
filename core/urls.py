from django.urls import path

from . import views


urlpatterns = [
    path('register/', views.RegisterApiView.as_view(), name='api-register'),
    path('login/', views.LoginApiView.as_view(), name='api-login'),
    path('user/', views.UserApiView.as_view(), name='api-user'),
    path('refresh/', views.RefreshApiView.as_view(), name='api-refresh'),
    path('logout/', views.LogoutApiView.as_view(), name='api-logout'),
    path('forgot/', views.ForgotApiView.as_view(), name='api-forgot'),
    path('reset/', views.ForgotApiView.as_view(), name='api-reset'),
]
