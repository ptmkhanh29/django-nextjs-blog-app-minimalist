from django.db import models
from django.utils.text import slugify
from django.utils import timezone
import re
from django.contrib.auth.models import User

class Type(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Tag(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


def vietnamese_slugify(value):
    replacements = (
        ("à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ", "a"),
        ("è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ", "e"),
        ("ì|í|ị|ỉ|ĩ", "i"),
        ("ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ", "o"),
        ("ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ", "u"),
        ("ỳ|ý|ỵ|ỷ|ỹ", "y"),
        ("đ", "d"),
    )
    for (pattern, replacement) in replacements:
        value = re.sub(pattern, replacement, value)
    return slugify(value)


class Article(models.Model):
    class Status(models.TextChoices):
        DRAFT = 'DF', 'Draft'
        PUBLISHED = 'PB', 'Published'

    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)  # Set blank=True to allow form submission without a slug
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    categories = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    tags = models.ManyToManyField(Tag)
    image = models.ImageField(upload_to='articles_images/')
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
