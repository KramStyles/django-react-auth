from rest_framework import generics, views, response, status, exceptions

from . import serializers
from .models import User


class RegisterApiView(generics.GenericAPIView):
    serializer_class = serializers.RegisterSerializer
    queryset = User.objects.all()

    def post(self, request):
        
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return response.Response({'message': 'Success', 'data': serializer.data}, status=status.HTTP_201_CREATED)
        else:
            raise exceptions.ValidationError(serializer.errors)
