from rest_framework import serializers

from . import models
from .utils import handle_epub_data

class Base64ImageField(serializers.ImageField):

    def to_internal_value(self, data):
        from django.core.files.base import ContentFile
        import base64
        import six
        import uuid

        # Check if this is a base64 string
        if isinstance(data, six.string_types):
            # Check if the base64 string is in the "data:" format
            if 'data:' in data and ';base64,' in data:
                # Break out the header from the base64 content
                header, data = data.split(';base64,')

            # Try to decode the file. Return validation error if it fails.
            try:
                decoded_file = base64.b64decode(data)
            except TypeError:
                self.fail('invalid_image')
            # Generate file name:

            file_name = str(uuid.uuid4())[:12] # 12 characters are more than enough.
            # Get the file name extension:
            file_extension = self.get_file_extension(file_name, decoded_file)

            complete_file_name = "%s.%s" % (file_name, file_extension, )

            data = ContentFile(decoded_file, name=complete_file_name)

        return super(Base64ImageField, self).to_internal_value(data)

    def get_file_extension(self, file_name, decoded_file):
        import imghdr

        extension = imghdr.what(file_name, decoded_file)
        extension = "jpg" if extension == "jpeg" else extension

        return extension


class AuthorSerializer(serializers.ModelSerializer):
    portrait = Base64ImageField(max_length=None, use_url=True)

    class Meta:
        model = models.Author
        fields = ['id', 'first_name', 'last_name', 'portrait', 'biography', 'slug']

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