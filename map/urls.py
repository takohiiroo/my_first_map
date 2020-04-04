from django.urls import path
from . import views



urlpatterns = [
    path('', views.post_home, name='post_home'),
    path('post/new/', views.post_new, name='post_new'),
    path('post/<int:pk>/edit/', views.post_edit, name='post_edit'),
]