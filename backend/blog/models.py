from django.db import models
from django.utils.text import slugify
from django.utils import timezone
import re
from django.contrib.auth.models import User
from .firebase import upload_image_to_firebase
from ckeditor.fields import RichTextField
from ckeditor_uploader.fields import RichTextUploadingField 
import os

class Type(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=100)
    hex_color = models.CharField(max_length=7, default='#FFFFFF')

    def __str__(self):
        return self.name


class Tag(models.Model):
    name = models.CharField(max_length=100)
    hex_color = models.CharField(max_length=7, default='#FFFFFF')

    def __str__(self):
        return self.name


def vietnamese_slugify(value):
    replacements = (
        (r"à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ", "a"),
        (r"è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ", "e"),
        (r"ì|í|ị|ỉ|ĩ", "i"),
        (r"ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ", "o"),
        (r"ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ", "u"),
        (r"ỳ|ý|ỵ|ỷ|ỹ", "y"),
        (r"đ", "d"),
        (r"[^\w\s-]", ""),
        (r"[-\s]+", "-"),
    )
    for (pattern, replacement) in replacements:
        value = re.sub(pattern, replacement, value, flags=re.IGNORECASE)
    value = slugify(value)
    return value


class Article(models.Model):
    class Status(models.TextChoices):
        DRAFT = 'DF', 'Draft'
        PUBLISHED = 'PB', 'Published'

    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)  # Set blank=True to allow form submission without a slug
    #content = models.TextField()
    content = RichTextUploadingField() # CKEditor Rich Text Field
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    tags = models.ManyToManyField(Tag)
    image = models.ImageField(upload_to='articles_images/', blank=True, null=True)
    image_url = models.URLField(max_length=500, blank=True, null=True)  # Updated field to store image URL from Firebase
    intro = models.TextField()
    estimate_time = models.CharField(max_length=50)
    type = models.ForeignKey(Type, on_delete=models.SET_NULL, null=True)
    publish = models.DateTimeField(default=timezone.now)
    status = models.CharField(max_length=2,
                              choices=Status.choices,
                              default=Status.DRAFT)

    class Meta:
        ordering = ['-publish']
        indexes = [
            models.Index(fields=['-publish']),
        ]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = vietnamese_slugify(self.title)
            original_slug = self.slug
            num = 1
            while Article.objects.filter(slug=self.slug).exists():
                self.slug = f'{original_slug}-{num}'
                num += 1

        super().save(*args, **kwargs)
        
        if self.image:
            local_path = self.image.path
            print(f"local_path = {local_path}")
            full_path = os.path.join('backend/media/', local_path)
            print(f"full_path = {full_path}")
            file_name = f"{self.slug}_{self.image.name}"
            self.image_url = upload_image_to_firebase(self.title, full_path, os.path.basename(full_path))
            super().save(update_fields=['image_url'])