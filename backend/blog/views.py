from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from .models import Article, Tag, Category
from .serializers import ArticleSerializer, TagSerializer, CategorySerializer
from rest_framework.generics import ListAPIView
from django.db.models import Count
from django.http import JsonResponse
from .firebase import upload_image_to_firebase 
from rest_framework.decorators import api_view
from rest_framework.parsers import MultiPartParser, FormParser

class ArticleList(generics.ListAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

class ArticleDetail(generics.RetrieveAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

class TagListView(ListAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

class CategoryListView(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer