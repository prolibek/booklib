from rest_framework.permissions import BasePermission, IsAdminUser, SAFE_METHODS

class IsAdminOrReadOnly(BasePermission):

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True 
        return request.user.is_superuser