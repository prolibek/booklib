from django.urls import path, include 

from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()

router.register(r'books', views.BookViewSet)
router.register(r'genres', views.GenreViewSet)
router.register(r'authors', views.AuthorViewSet)
router.register(r'sections', views.SectionViewSet, basename='sections')

urlpatterns = [
    path('', include(router.urls)),
    path('books/<int:id>/sections/', views.BookViewSet.as_view({'get':'sections'}), name='book-sections'),
    path('books/<int:id>/overviews/', views.BookViewSet.as_view({'get':'overviews'}), name='book-overviews'),
    path('books/<int:id>/books/', views.BookViewSet.as_view({'get':'books'}), name='author-books'),
    path('books/<int:id>/books/', views.BookViewSet.as_view({'get':'books'}), name='genres-books'),
]