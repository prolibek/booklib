from rest_framework import views, viewsets
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.decorators import action

from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import get_object_or_404

from . import serializers, models, permissions, filters

# book utils

def check_book_permissions(func):
    def wrapper(self, request, *args, **kwargs):
        pk = kwargs['pk']
        book = get_object_or_404(models.Book, pk=pk)
        if not (book.is_published or request.user.is_staff):
            return Response({
                "detail": "Access forbidden"
            })
        return func(self, request, book, pk)
    return wrapper

# end book utils

class BookViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.BookSerializer
    queryset = models.Book.objects.all()
    permission_classes = ( permissions.IsAdminOrReadOnly )
    filter_backends = ( filters.PublishedBooksFilterBackend, )
    
    @check_book_permissions
    def retrieve(self, request, book, pk=None):
        return Response(
            {
                "book": serializers.BookSerializer(book).data,
            }
        ) 

    @check_book_permissions
    @action(detail=True, methods=['GET'])
    def sections(self, request, book, pk=None):
        sections = book.section_set.all().values()
        return Response(
            {
                "book": serializers.BookSerializer(book).data,
                "sections": sections,
            }
        )

    @check_book_permissions
    @action(detail=True, methods=['GET'])
    def overviews(self, request, book, pk=None):
        overviews = book.overview_set.all().values()
        return Response(
            {
                "book": serializers.BookSerializer(book).data,
                "overviews": overviews,
            }
        )

class AuthorViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.AuthorSerializer
    queryset = models.Author.objects.all()
    permission_classes = ( permissions.IsAdminOrReadOnly, )

    def retrieve(self, request, pk=None):
        author = get_object_or_404(models.Author, id=pk)
        return Response(
            {
                "author": serializers.AuthorSerializer(author).data,
            }
        )

    @action(detail=True, methods=['GET'])
    def books(self, request, pk=None):
        author = get_object_or_404(models.Author, id=pk)
        if not (request.user.is_staff):
            books = author.book_set.filter(is_published=True).all().values()
        else: 
            books = author.book_set.all().values()
        return Response(
            {
                "author": serializers.AuthorSerializer(author).data,
                "books": books,
            }
        )

class GenreViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.GenreSerializer
    queryset = models.Genre.objects.all()
    permission_classes = ( permissions.IsAdminOrReadOnly, )

    def retrieve(self, request, pk=None):
        genre = get_object_or_404(models.Genre, id=pk)
        return Response(
            {
                "genre": serializers.GenreSerializer(genre).data,
            }
        )

    @action(detail=True, methods=['GET'])
    def books(self, request, pk=None):
        genre = get_object_or_404(models.Genre, id=pk)
        if not (request.user.is_staff):
            books = genre.book_set.filter(is_published=True).all().values()
        else: 
            books = genre.book_set.all().values()
        return Response(
            {
                "genre": serializers.GenreSerializer(genre).data,
                "books": books,
            }
        )
    
# This viewset is only used to create new sections
class SectionViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.SectionSerializer
    queryset = models.Section.objects.all()
    permission_classes = ( permissions.IsAdminOrReadOnly, )
    http_method_names = ( 'post', 'put', 'patch', 'delete' )
