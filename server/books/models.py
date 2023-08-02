from django.db import models
from django.contrib.auth import get_user_model

# Every book has an author
class Author(models.Model):
    first_name = models.CharField(max_length=63)
    last_name = models.CharField(max_length=63, null=True, blank=True)
    portrait = models.ImageField(upload_to='portraits/', null=True, blank=True)
    biography = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

# Every book has its genre
class Genre(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name

# Book itself
class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.ForeignKey(Author, on_delete=models.CASCADE, null=True, blank=True)
    poster = models.ImageField(upload_to='posters/', null=True, blank=True)
    annotation = models.TextField()
    genres = models.ManyToManyField(Genre, blank=True)
    slug = models.SlugField(unique=True, null=True)
    is_published = models.BooleanField(default=False)

    def __str__(self):
        return self.title

# Book is divided on chapters and being uploaded by 
# chapters
class Section(models.Model):
    title = models.CharField(max_length=255)
    order_id = models.IntegerField(default=0)
    content = models.TextField()
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)
    
    def __str__(self):
        return self.title

# Users are able to leave a comment for every chapter of the book
class ChapterComment(models.Model):
    content = models.TextField()
    author = models.ForeignKey(get_user_model(), on_delete=models.DO_NOTHING)
    chapter = models.ForeignKey(Section, on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)

class ChapterCommentLike(models.Model):
    author = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    comment = models.ForeignKey(ChapterComment, on_delete=models.CASCADE)

# Users are able to rate books and write overviews
# right after they finish reading the book
class Overview(models.Model):
    author = models.ForeignKey(get_user_model(), on_delete=models.DO_NOTHING)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    description = models.TextField()
    rate = models.SmallIntegerField()

# Users are able to categorize their own books
# by creating a shelf
class Shelf(models.Model):
    name = models.CharField(max_length=255)
    owner = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    books = models.ManyToManyField(Book)

# Users are able to make quotes from books
class Quote(models.Model):
    content = models.TextField()
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    user = models.ForeignKey(get_user_model(), on_delete=models.DO_NOTHING)

class QuoteComment(models.Model):
    content = models.TextField()
    quote = models.ForeignKey(Quote, on_delete=models.CASCADE)
    user = models.ForeignKey(get_user_model(), on_delete=models.DO_NOTHING)

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
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)