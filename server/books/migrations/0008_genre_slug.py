# Generated by Django 4.2.3 on 2023-08-02 14:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0007_author_slug'),
    ]

    operations = [
        migrations.AddField(
            model_name='genre',
            name='slug',
            field=models.SlugField(null=True, unique=True),
        ),
    ]
