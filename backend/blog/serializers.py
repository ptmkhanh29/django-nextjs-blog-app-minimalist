
"""
    Step by step create api
        1. Create Serializers with serializers.py => custom data from model to json
        2. In file views.py to handle logic of api
        3. In file urls.py of app, setting url for api
        4. In file urls.py of project, include url of app.
"""
from rest_framework import serializers
from .models import Tag, Category, Type, Article

class TagSerializer(serializers.ModelSerializer):
    article_count = serializers.SerializerMethodField()

    class Meta:
        model = Tag
        fields = ['name', 'article_count','hex_color']

    def get_article_count(self, obj):
        return obj.article_set.count()


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name']


class TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Type
        fields = ['name']


class ArticleSerializer(serializers.ModelSerializer):
    tags = serializers.SerializerMethodField()
    category = serializers.SerializerMethodField()

    class Meta:
        model = Article
        fields = '__all__'

    def get_tags(self, obj):
        return [tag.name for tag in obj.tags.all()]

    def get_category(self, obj):
        return [obj.category.name if obj.category else None]

