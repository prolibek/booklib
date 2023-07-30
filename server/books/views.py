from rest_framework import views, viewsets, permissions
from rest_framework.response import Response

from . import serializers, models, permissions

class BookViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.BookSerializer
    queryset = models.Book.objects.all()
    permission_classes = ( permissions.IsAdminOrReadOnly, )

    def retrieve(self, request, *args, **kwargs):
        book = self.get_object()
        chapters = book.chapter_set.all().values()
        return Response(
            {
                "book": serializers.BookSerializer(book).data,
                "chapters": chapters,
            }
        )

class GenreViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.GenreSerializer
    queryset = models.Genre.objects.all()
    permission_classes = ( permissions.IsAdminOrReadOnly, )

class AuthorViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.AuthorSerializer
    queryset = models.Author.objects.all()
    permission_classes = ( permissions.IsAdminOrReadOnly, )