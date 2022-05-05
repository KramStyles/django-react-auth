from datetime import datetime, timedelta, timezone
from secrets import token_urlsafe

from django.contrib.auth import login, authenticate
from django.contrib.sites.shortcuts import get_current_site
from django.shortcuts import reverse
from rest_framework import generics, views, response, status, exceptions

from . import serializers
from .models import User, UserToken, Reset
from .jwt_auth import gen_token, JWTAuthentication, decode_token
from .util import Utils


class RegisterApiView(generics.ListCreateAPIView):
    serializer_class = serializers.RegisterSerializer

    def get_queryset(self):
        return User.objects.all()

    def post(self, request):

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            # serializer.save()
            return response.Response({'message': 'Success', 'data': serializer.data}, status=status.HTTP_201_CREATED)
        else:
            raise exceptions.ValidationError(serializer.errors)


class LoginApiView(generics.GenericAPIView):
    serializer_class = serializers.RegisterSerializer

    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = authenticate(request, username=email, password=password)
        if user:
            serializer = self.serializer_class(user)

            access_token = gen_token(serializer.data)
            refresh_token = gen_token(serializer.data, 1)

            UserToken.objects.create(
                user=user, token=refresh_token,
                expired_at=datetime.utcnow() + timedelta(days=7)
            )

        else:
            raise exceptions.AuthenticationFailed('Invalid credentials')

        resp = response.Response(serializer.data)
        resp.data['access_token'] = access_token
        resp.set_cookie(key='refresh_token', value=refresh_token, httponly=True)
        return resp


class UserApiView(generics.ListAPIView):
    serializer_class = serializers.RegisterSerializer
    queryset = User.objects.all()

    authentication_classes = [JWTAuthentication]

    def get(self, request):
        return response.Response(request.user)


class RefreshApiView(views.APIView):
    def get(self, request):
        refresh_token = request.COOKIES.get('refresh_token')
        user = decode_token(refresh_token)['data']

        if not UserToken.objects.filter(user_id=user['id'], token=refresh_token, expired_at__gt=datetime.now(tz=timezone.utc)).exists():
            raise exceptions.AuthenticationFailed('Token Unauthenticated')

        access_token = gen_token(user)
        return response.Response({"message": "Token refreshed successfully", 'refresh_token': refresh_token, 'access_token': access_token}, status=status.HTTP_201_CREATED)


class LogoutApiView(views.APIView):
    def get(self, request):
        refresh_token = request.COOKIES.get('refresh_token')
        UserToken.objects.filter(token=refresh_token).delete()

        resp = response.Response()
        resp.delete_cookie(key='refresh_token')

        resp.data = {
            'message': 'Logged out!'
        }
        resp.status_code = status.HTTP_200_OK
        return resp


class ForgotApiView(views.APIView):
    def post(self, request):
        email = request.data['email']
        if User.objects.filter(email=email).exists():
            token = token_urlsafe(30)

            try:

                relative_url = reverse('api-reset')
                data = {
                    'subject': 'Password Reset',
                    'body': f"This is a message to reset your password. Click link to reset http://{get_current_site(request).domain}{relative_url}?token={token}",
                    'receiver': email
                }

                Utils.send_email(data)

                Reset.objects.create(email=email, token=token)

                return response.Response({'message': 'Success', 'details': 'Reset email sent'}, status=status.HTTP_201_CREATED)
            except Exception as err:
                return response.Response({'message': 'Error', 'details': str(err)}, status=status.HTTP_400_BAD_REQUEST)

        return response.Response({'message': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)
