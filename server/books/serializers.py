from rest_framework import serializers

from . import models

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Author
        fields = '__all__'

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Book
        fields = '__all__'

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Genre
        fields = '__all__'

class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Section
        fields = '__all__'