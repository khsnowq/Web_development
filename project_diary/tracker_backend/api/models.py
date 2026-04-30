from django.db import models
from django.contrib.auth.models import User
from datetime import date
class MoodEntry(models.Model):
    MOOD_CHOICES = [
        ('happy', 'Happy'),
        ('sad', 'Sad'),
        ('angry', 'Angry'),
        ('neutral', 'Neutral'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    mood = models.CharField(max_length=10, choices=MOOD_CHOICES)
    note = models.TextField(blank=True)

class Habit(models.Model):
    name = models.CharField(max_length=100)
    frequency = models.CharField(max_length=50)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class HabitLog(models.Model):
    habit = models.ForeignKey(Habit, on_delete=models.CASCADE, related_name='logs')
    date = models.DateField(auto_now_add=True)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.habit.name} - {self.date} - {'Done' if self.completed else 'Missed'}"
class WishlistItem(models.Model):
    CATEGORY_CHOICES = [
        ('material', 'Material'),
        ('travel', 'Travel'),
        ('learning', 'Learning'),
    ]
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
        ('done', 'Done'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    image = models.ImageField(upload_to='wishlist/', blank=True, null=True)
    link = models.URLField(blank=True)

class Task(models.Model):
    STATUS_CHOICES = [
        ('todo', 'To Do'),
        ('done', 'Done'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    date = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
