from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.conf.urls.static import static
from .views import (
    MoodAPIView,
     HabitViewSet,
    HabitLogViewSet,
    WishlistAPIView,
    delete_wishlist_item,
    tasks_view,
    delete_task
)
router = DefaultRouter()
router.register(r'habits', HabitViewSet, basename='habit')
router.register(r'habit-logs', HabitLogViewSet, basename='habitlog')

urlpatterns = [
    path('moods/', MoodAPIView.as_view()),
    
    path('wishlist/', WishlistAPIView.as_view()),
    path('wishlist/<int:pk>/', delete_wishlist_item),
    path('tasks/', tasks_view),
    path('tasks/<int:pk>/', delete_task),
    path('', include(router.urls)),
]
