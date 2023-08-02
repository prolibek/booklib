from rest_framework import views, viewsets
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.decorators import action

from django.shortcuts import get_object_or_404

from . import serializers, models, permissions, filters

# book utils
def get_book_by_slug(slug):
    try: 
        book = models.Book.objects.get(slug=slug)
    except:
        book = models.Book.objects.get(pk=int(slug))
    return book

def check_book_permissions(func):
    def wrapper(self, request, *args, **kwargs):
        book = get_book_by_slug(kwargs['slug'])
        if not (book.is_published or request.user.is_staff):
            return Response({
                "detail": "Access forbidden"
            })
        return func(self, request, book, *args, **kwargs)
    return wrapper
# end book utils

class BookViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.BookSerializer
    queryset = models.Book.objects.all()
    permission_classes = ( permissions.IsAdminOrReadOnly, )
    lookup_field = 'slug'
    filter_backends = ( filters.PublishedBooksFilterBackend, )

    @check_book_permissions
    def retrieve(self, request, book, *args, **kwargs):
        return Response(
            {
                "book": serializers.BookSerializer(book).data,
            }
        ) 

    @check_book_permissions
    @action(detail=True, methods=['GET'])
    def sections(self, request, book, *args, **kwargs):
        sections = book.section_set.all().values()
        return Response(
            {
                "book": serializers.BookSerializer(book).data,
                "sections": sections,
            }
        )
    
    @check_book_permissions
    @action(detail=True, methods=['GET'])
    def overviews(self, request, book, *args, **kwargs):
        overviews = book.overview_set.all().values()
        return Response(
            {
                "book": serializers.BookSerializer(book).data,
                "overviews": overviews,
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