from django.urls import path
from .views import ArticleList, ArticleDetail, TagListView, CategoryListView

urlpatterns = [
    path('articles/', ArticleList.as_view(), name='article-list'),
    path('articles/<int:pk>/', ArticleDetail.as_view(), name='article-detail'),
    path('tags/', TagListView.as_view(), name='tag-list'),
    path('category/', CategoryListView.as_view(), name='category-list'),
]
