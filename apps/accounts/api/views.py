from django.contrib import auth
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect
from django.db.models import Q
from django.db.models import Exists, OuterRef


from .serializer import  RegisterSerializer, LoginSerializer
from apps.accounts.models import User
from apps.messaging.models import Dialog

from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import  MultiPartParser,FormParser

csrf_protect_method = method_decorator(csrf_protect)

class RegistrationView(GenericAPIView):
    """
    Create new Users for the system.
    """
    authentication_classes = []
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class LoginView(GenericAPIView):
    """
    Login Users for the system.
    """
    authentication_classes = []
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer

    def post(self, request, format=None):
        email = request.data.get('email', None)
        password = request.data.get('password', None)
        if password and email:
            user = auth.authenticate(email=request.data['email'], password=request.data['password'])
        else:
            return Response({"error":"Bad Request"}, status=status.HTTP_400_BAD_REQUEST)
        if user is not None:
            serializer = self.serializer_class(user)
            return Response(serializer.data, status=status.HTTP_200_OK)

        else:
            return Response({"error":"Invalid Credentials"}, status=status.HTTP_401_UNAUTHORIZED)



class AuthenticationView(GenericAPIView):
    """
    Authenticating users with tokens
    """
    permission_classes = [ IsAuthenticated]
    serializer_class = RegisterSerializer

    def get(self, request):
        user = request.user
        serializer = self.serializer_class(user)
        return Response({"user":serializer.data})


class FetchUsers(GenericAPIView):
    """
    Fetch Users with no relationship with the logged in user.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        existing_dialog = Dialog.objects.filter(
            Q(sender=OuterRef('pk'), recepient=request.user) |
            Q(sender=request.user, recepient=OuterRef('pk'))
        )

        users = User.objects.exclude(pk=request.user.pk).annotate(
            has_dialog=Exists(existing_dialog)
        ).filter(has_dialog=False)

        response = [{
            "uuid": user.uuid,
            "username": user.username,
            "profile": user.profile.url if user.profile else None
        } for user in users]

        return Response(response, status=status.HTTP_200_OK)

class EditProfile(GenericAPIView):

    permission_classes = [ IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def put(self, request, **kwargs):
        email = request.data.get('email')
        # username = request.data.get('username')
        profile = request.data.get('profile')
        user = request.user

        if email:
            user.email = email
        # if username:
        #     user.username = username
        if profile:
            user.profile = profile

        user.save()

        data = {
            "email":user.email,
            "username":user.username,
            "profile":user.profile.url
        }

        return Response(data, status=status.HTTP_200_OK)
