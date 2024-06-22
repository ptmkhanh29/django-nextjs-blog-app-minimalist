from django.contrib import admin
from django import forms
from .models import Article, Category, Tag, Type

# Register your models here.

admin.site.register(Category)
admin.site.register(Tag)
admin.site.register(Type)

class ArticleForm(forms.ModelForm):
    class Meta:
        model = Article
        fields = '__all__'
        widgets = {
            'content': forms.Textarea(attrs={
                'style': 'width: 100%; height: 500px; font-family: "Courier New", Courier, monospace; background-color: white; border: 1px solid #ccc;'
            }),
        }

class ArticleAdmin(admin.ModelAdmin):
    form = ArticleForm
    list_display = ['title', 'slug', 'author', 'publish', 'status']
    list_filter = ['status', 'created_at', 'publish', 'author']
    search_fields = ['title', 'content']
    prepopulated_fields = {'slug': ('title',)}
    raw_id_fields = ['author']
    date_hierarchy = 'publish'
    ordering = ['status', 'publish']

admin.site.register(Article, ArticleAdmin)