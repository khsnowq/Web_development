from django.contrib import admin
from .models import Habit,HabitLog,WishlistItem,Task,MoodEntry

admin.site.register(Habit)
admin.site.register(HabitLog)
admin.site.register(WishlistItem)
admin.site.register(Task)
admin.site.register(MoodEntry)
