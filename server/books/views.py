from rest_framework import views, viewsets
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response

from django.shortcuts import get_object_or_404

from . import serializers, models, permissions, filters

class BookViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.BookSerializer
    queryset = models.Book.objects.all()
    permission_classes = ( permissions.IsAdminOrReadOnly, )
    lookup_field = 'slug'
    filter_backends = ( filters.PublishedBooksFilterBackend, )

    def retrieve(self, request, *args, **kwargs):
        value = kwargs.get("slug")
        try: 
            book = models.Book.objects.get(slug=value)
        except:
            book = models.Book.objects.get(pk=int(value))
        sections = book.section_set.all().values()
        return Response(
            {
                "book": serializers.BookSerializer(book).data,
                "sections": sections,
            }
        )

class SectionViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.SectionSerializer
    queryset = models.Section.objects.all()
    permission_classes = ( permissions.IsAdminOrReadOnly, )
    http_method_names = ( 'post', 'put', 'patch', 'delete' )

class GenreViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.GenreSerializer
    queryset = models.Genre.objects.all()
    permission_classes = ( permissions.IsAdminOrReadOnly, )

class AuthorViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.AuthorSerializer
    queryset = models.Author.objects.all()
    permission_classes = ( permissions.IsAdminOrReadOnly, )