# Generated by Django 4.2.13 on 2024-05-19 09:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0002_alter_article_author'),
    ]

    operations = [
        migrations.RenameField(
            model_name='article',
            old_name='categories',
            new_name='category',
        ),
    ]