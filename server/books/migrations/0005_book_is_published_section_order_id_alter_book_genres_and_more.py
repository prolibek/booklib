# Generated by Django 4.2.3 on 2023-08-01 12:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0004_section_rename_name_book_title_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='is_published',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='section',
            name='order_id',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='book',
            name='genres',
            field=models.ManyToManyField(blank=True, to='books.genre'),
        ),
        migrations.AlterField(
            model_name='chaptercomment',
            name='chapter',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='books.section'),
        ),
        migrations.AlterField(
            model_name='chaptercomment',
            name='parent',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='books.chaptercomment'),
        ),
    ]