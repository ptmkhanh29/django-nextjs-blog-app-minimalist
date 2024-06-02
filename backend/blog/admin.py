from django.contrib import admin
from .models import Article, Category, Tag, Type

# Register your models here.

admin.site.register(Category)
admin.site.register(Tag)
admin.site.register(Type)


class ArticleAdmin(admin.ModelAdmin):
    list_display = ['title', 'slug', 'author', 'publish', 'status']
    list_filter = ['status', 'created_at', 'publish', 'author']
    search_fields = ['title', 'content']
    prepopulated_fields = {'slug': ('title',)}
    raw_id_fields = ['author']
    date_hierarchy = 'publish'
    ordering = ['status', 'publish']

admin.site.register(Article, ArticleAdmin)