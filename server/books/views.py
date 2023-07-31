from rest_framework import views, viewsets, permissions
from rest_framework.response import Response

from . import serializers, models, permissions

class BookViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.BookSerializer
    queryset = models.Book.objects.all()
    permission_classes = ( permissions.IsAdminOrReadOnly, )

    def retrieve(self, request):
        book = self.get_object()
        sections = book.section_set.all().values()
        return Response(
            {
                "book": serializers.BookSerializer(book).data,
                "sections": sections,
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