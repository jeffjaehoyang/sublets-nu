from rest_framework import generics
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import CustomUser
from accounts.serializers import UserSerializer


class AccountDetail(generics.RetrieveUpdateAPIView):
    # default permission class : permissions.isAuthorized
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    lookup_field = "id"


class CurrentUser(APIView):
    # default permission class : permissions.isAuthorized

    def get(self, request):
        serializer = UserSerializer(self.request.user)
        return Response(serializer.data)
