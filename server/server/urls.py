from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    #path('admin/', admin.site.urls),
    path(r'users/', include('users.urls')),
    path(r'books/', include('books.urls')),
]
