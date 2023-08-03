from rest_framework import serializers

from . import models
from .utils import handle_epub_data

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Author
        fields = '__all__'

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Book
        fields = '__all__'
    
    def create(self, validated_data):
        epub_data = validated_data.get('epub', None)
        genres = validated_data.pop('genres', [])

        instance = self.Meta.model(**validated_data)
        instance.save()

        if epub_data is None:
            validated_data['epub'] = None 
        else: 
            handle_epub_data(epub_data, instance)

        for genre in genres:
            instance.genres.add(genre)
            
        return instance
        

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Genre
        fields = '__all__'

class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Section
        fields = '__all__'