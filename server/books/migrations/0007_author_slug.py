# Generated by Django 4.2.3 on 2023-08-02 14:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0006_author_portrait_book_poster'),
    ]

    operations = [
        migrations.AddField(
            model_name='author',
            name='slug',
            field=models.SlugField(null=True, unique=True),
        ),
    ]
