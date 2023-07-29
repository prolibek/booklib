from django.shortcuts import render
from django.conf import settings

from rest_framework import viewsets, views
from rest_framework.response import Response

from . import serializers, models, utils

import jwt

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

            return Response(data)
        else:
            return Response(serializer.errors)

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
                return Response({ 'detail': 'User not found.' })
        
        if not user.check_password(password):
            return Response({ 'detail': 'Password is incorrect.' })
        
        serializer = serializers.UserSerializer(instance=user)

        access_token, refresh_token = utils.generate_jwt_tokens(user, request.data['device'])

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
            })
        except models.ActivationToken.DoesNotExist: 
            return Response({
                'detail': 'Activation token has expired or does not exist'
            })
        except Exception as e:
            return Response({
                'detail': str(e)
            })

class LogoutAPIView(views.APIView):
    def post(self, request):
        # To accomplish logging out client should send user's email
        email = request.data['email']
        device = request.data['device']

        user = models.CustomUser.objects.get(email=email)
        # That means that logging out from one device will lead to logging out from all devices 
        # Maybe I later I will rewrite it to cookie based JWT authentication
        # Or just start to use simplejwt :(
        tokens = models.RefreshToken.objects.filter(user=user, device=device)
        tokens.delete()

        return Response({ 'detail': f'Logout in {device} has been succesfully accomplished.' })

# Should write a function that will automatically delete expired tokens

# test later
class RefreshTokenAPIView(views.APIView):
    def post(self, request):
        device = request.data['device']
        refresh_token = request.data['refresh_token']
        try: 
            old_token = models.RefreshToken.objects.get(token=refresh_token, device=device)
            old_token.delete()
            decoded_token = jwt.decode(refresh_token, settings.SECRET_KEY, algorithms=['HS256'])
            id = decoded_token['id']
            user = models.CustomUser.objects.get(id=id)
            new_access_token, new_refresh_token = utils.generate_jwt_tokens(user, device)
            return Response({
                'access_token': new_access_token,
                'refresh_token': new_refresh_token,
                'detail': 'New access and refresh token have been succesfully generated!'
            })
        except jwt.ExpiredSignatureError:
            return Response({
                'detail': 'Refresh token has expired'
            })
        except (jwt.DecodeError, models.CustomUser.DoesNotExist):
            return Response({
                'detail': 'Invalid token error'
            })
        except Exception as e:
            return Response({
                'detail': str(e)
            })