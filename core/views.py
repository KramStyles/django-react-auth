from django.contrib.auth import login, authenticate
from rest_framework import generics, views, response, status, exceptions

from . import serializers
from .models import User


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
        else:
            raise exceptions.AuthenticationFailed('Invalid credentials')
        return response.Response(serializer.data)
