from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from . import models 

# put modelserializer to override create function
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CustomUser
        fields = [
            'id',
            'email',
            'username',
            'password',
            'first_name',
            'last_name',
        ]
    
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)

        if password is not None:
            instance.set_password(password)

        instance.save()

        models.Rank.objects.create(user=instance)
        
        return instance

class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    default_error_messages = {
        'bad_token': ('Token is invalid or expired')
    }

    def validate(self, attrs):
        self.token = attrs['refresh']

        return attrs
    
    def save(self):
        try: 
            RefreshToken(self.token).blacklist()
        except:
            self.fail('bad_token')