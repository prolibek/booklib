from django.urls import path, include 

from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()

router.register(r'book', views.BookViewSet)
router.register(r'genre', views.GenreViewSet)
router.register(r'author', views.AuthorViewSet)

urlpatterns = [
    path('', include(router.urls)),
]