from rest_framework import serializers
from .models import MoodEntry, Habit, HabitLog, WishlistItem, Task
from datetime import date
class MoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = MoodEntry
        fields = '__all__'
        read_only_fields = ['user', 'date']


class HabitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habit
        fields = '__all__'
        read_only_fields = ['user']
        
class HabitLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = HabitLog
        fields = '__all__'

class WishlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = WishlistItem
        fields = '__all__'
        read_only_fields = ['user']

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'
        read_only_fields = ['user']
