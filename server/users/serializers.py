from rest_framework import serializers

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
        return instance