from django.db import models
from django.contrib.auth.models import AbstractUser

import uuid

class CustomUser(AbstractUser):
    email = models.CharField(unique=True, max_length=255)
    username = models.CharField(unique=True, max_length=16)

    first_name = models.CharField(max_length=30, null=True)
    last_name = models.CharField(max_length=63, null=True)

    date_joined = models.DateTimeField(auto_now_add=True)

    is_email_confirmed = models.BooleanField(default=False)

    USERNAME_FIELD = 'username'
    EMAIL_FIELD = 'email'

class RefreshToken(models.Model):
    token = models.CharField(max_length=255, unique=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    # defining device id lays on client side
    device = models.CharField(max_length=255)

class ActivationToken(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

# Every book has an author
class Author(models.Model):
    first_name = models.CharField(max_length=63)
    last_name = models.CharField(max_length=63)

    biography = models.TextField()

# Every book has its genre
class Genre(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()

# Book itself
class Book(models.Model):
    name = models.CharField(max_length=255)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    annotation = models.TextField()
    genres = models.ManyToManyField(Genre)

# Book is divided on chapters and being uploaded by 
# chapters
class Chapter(models.Model):
    number = models.IntegerField()
    name = models.CharField(max_length=255)
    content = models.TextField()
    book = models.ForeignKey(Book, on_delete=models.CASCADE)

# Users are able to leave a comment for every chapter of the book
class ChapterComment(models.Model):
    content = models.TextField()
    author = models.ForeignKey(CustomUser, on_delete=models.DO_NOTHING)
    created_at = models.DateTimeField(auto_now_add=True)
    parent_comment = models.ForeignKey('self', on_delete=models.CASCADE)

class ChapterCommentLike(models.Model):
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    comment = models.ForeignKey(ChapterComment, on_delete=models.CASCADE)

# Users are able to rate books and write overviews
# right after they finish reading the book
class Overview(models.Model):
    author = models.ForeignKey(CustomUser, on_delete=models.DO_NOTHING)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    description = models.TextField()
    rate = models.SmallIntegerField()

# Users are able to categorize their own books
# by creating a shelf
class Shelf(models.Model):
    name = models.CharField(max_length=255)
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    books = models.ManyToManyField(Book)

# Users are able to make quotes from books
class Quote(models.Model):
    content = models.TextField()
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.DO_NOTHING)

class QuoteComment(models.Model):
    content = models.TextField()
    quote = models.ForeignKey(Quote, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.DO_NOTHING)

# Here user chooses book and puts it a status
# Dropped/in progress/finished/planned
class BookStatus(models.Model):
    
    DROPPED = 1
    IN_PROGRESS = 2
    FINISHED = 3
    PLANNED = 4

    STATUS_TYPE_CHOICES = (
        (DROPPED, 'dropped'),
        (IN_PROGRESS, 'in progress'),
        (FINISHED, 'finished'),
        (PLANNED, 'planned')
    )

    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)