from django.shortcuts import render
from django.conf import settings

from rest_framework import viewsets, views, status
from rest_framework.response import Response

from . import serializers, models, utils

from rest_framework_simplejwt.tokens import RefreshToken, AccessToken

class RegisterAPIView(views.APIView):
    def post(self, request):
        serializer = serializers.UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        activation_token = models.ActivationToken.objects.create(user=user)
        utils.send_activation_mail(user.email, activation_token.pk, request)

        tokens = RefreshToken.for_user(user)
        tokens['is_email_confirmed'] = user.is_email_confirmed
        tokens['is_admin'] = user.is_staff

        return Response({
            'detail': 'Activation email was successfully sent.',
            'refresh_token': str(tokens),
            'access_token': str(tokens.access_token)
        })

class LoginAPIView(views.APIView):
    def post(self, request):
        login_id = request.data['login_id']
        password = request.data['password']

        try:
            user = models.CustomUser.objects.get(email=login_id) | models.CustomUser.objects.get(username=login_id)
        except models.CustomUser.DoesNotExist:
            return Response({ 'detail': 'User not found.' }, status=status.HTTP_401_UNAUTHORIZED)
        
        if not user.check_password(password):
            return Response({ 'detail': 'Password is incorrect.' }, status=status.HTTP_401_UNAUTHORIZED)
        
        tokens = RefreshToken.for_user(user)
        tokens['is_email_confirmed'] = user.is_email_confirmed
        tokens['is_admin'] = user.is_staff
        
        return Response({
            'access_token': str(tokens.access_token),
            'refresh_token': str(tokens)
        })

class ActivateAccountAPIView(views.APIView):
    # Whenever and wherever put request as an argument
    def get(self, request, token):
        try:
            activation_token = models.ActivationToken.objects.get(pk=token)
            user = activation_token.user
            user.is_email_confirmed = True
            activation_token.delete()
            user.save()
            return Response({
                'detail': 'Account has been succesfully activated.'
            }, status=status.HTTP_200_OK)
        except models.ActivationToken.DoesNotExist: 
            return Response({
                'detail': 'Activation token has expired or does not exist.'
            }, status=status.HTTP_403_FORBIDDEN)
        except Exception as e:
            return Response({
                'detail': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

class LogoutAPIView(views.APIView):
    def post(self, request):
        serializer = serializers.LogoutSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({ 'detail': 'Logout has been successfully accomplished.' }, status=status.HTTP_200_OK)