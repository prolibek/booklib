from rest_framework.filters import BaseFilterBackend

class PublishedBooksFilterBackend(BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        if not (request.user.is_superuser or request.user.is_staff):
            queryset = queryset.filter(is_published=True)
        return queryset