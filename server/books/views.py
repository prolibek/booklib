from rest_framework import views, viewsets, permissions
from rest_framework.response import Response

from . import serializers, models

class BookViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.BookSerializer
    queryset = models.Book.objects.all()

    def get_permissions(self):
        ADMIN_METHODS = ( "POST", "PUT", "DELETE" )

        if self.request.method in ADMIN_METHODS:
            return ( permissions.IsAdminUser(), )
        return super().get_permissions()