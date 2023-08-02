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
    path('books/<slug:slug>/sections', views.BookViewSet.as_view({'get':'sections'}), name='book-sections')
]