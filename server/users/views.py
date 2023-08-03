from django.shortcuts import render
from django.conf import settings

from rest_framework import viewsets, views, status
from rest_framework.response import Response

from . import serializers, models, utils

from rest_framework_simplejwt.tokens import RefreshToken, AccessToken

class RegisterAPIView(views.APIView):
    def post(self, request):
        serializer = serializers.UserSerializer(data=request.data)

        data = {}
         
        if serializer.is_valid():
            serializer.save()
            data['user'] = serializer.data
            try:
                email=request.data['email']

                user = models.CustomUser.objects.get(email=email)
                activation_token = models.ActivationToken.objects.create(user=user)

                utils.send_activation_mail(email, activation_token.pk, request)

                data['detail'] = 'Activation email was succesfully sent'
            except Exception as e: 
                data['detail'] = str(e)

            return Response(data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginAPIView(views.APIView):
    def post(self, request):
        # User chooses if he wants to login using username or email
        login_id = request.data['login_id']
        password = request.data['password']

        # A bit nesting here (fix it if you want)
        try:
            user = models.CustomUser.objects.get(email=login_id)
        except models.CustomUser.DoesNotExist:
            try:
                user = models.CustomUser.objects.get(username=login_id)
            except:
                return Response({ 'detail': 'User not found.' }, status=status.HTTP_401_UNAUTHORIZED)
        
        if not user.check_password(password):
            return Response({ 'detail': 'Password is incorrect.' }, status=status.HTTP_401_UNAUTHORIZED)
        
        serializer = serializers.UserSerializer(instance=user)

        # generating simplejwt tokens
        tokens = RefreshToken.for_user(user)

        refresh_token = str(tokens)
        access_token = str(tokens.access_token)

        return Response({
            'user': serializer.data,
            'access_token': access_token,
            'refresh_token': refresh_token
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
                'detail': 'Account has been succesfully activated'
            }, status=status.HTTP_200_OK)
        except models.ActivationToken.DoesNotExist: 
            return Response({
                'detail': 'Activation token has expired or does not exist'
            }, status=status.HTTP_403_FORBIDDEN)
        except Exception as e:
            return Response({
                'detail': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

class LogoutAPIView(views.APIView):
    def post(self, request):
        serializer = serializers.LogoutSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                { 'detail': 'Logout has been succesfully accomplished.' }, 
                status=status.HTTP_200_OK
            )
        else:
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )