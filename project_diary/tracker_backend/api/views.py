from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import MoodEntry, Habit, HabitLog, WishlistItem, Task
from .serializers import MoodSerializer, HabitSerializer, HabitLogSerializer, WishlistSerializer, TaskSerializer
from datetime import date
from .models import HabitLog
from rest_framework import viewsets
from .serializers import HabitLogSerializer
# === MOODS === (CBV)
class MoodAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        moods = MoodEntry.objects.filter(user=request.user).order_by('-date')
        return Response(MoodSerializer(moods, many=True).data)

    def post(self, request):
        serializer = MoodSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

# === HABITS === (FBV — GET и POST в одной вьюшке)
class HabitViewSet(viewsets.ModelViewSet):
    serializer_class = HabitSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Habit.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class HabitLogViewSet(viewsets.ModelViewSet):
    queryset = HabitLog.objects.all()
    serializer_class = HabitLogSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return HabitLog.objects.filter(habit__user=self.request.user)

# === WISHLIST === (CBV — GET и POST)
class WishlistAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        items = WishlistItem.objects.filter(user=request.user)
        return Response(WishlistSerializer(items, many=True).data)

    def post(self, request):
        serializer = WishlistSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

# Wishlist — DELETE (FBV)
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_wishlist_item(request, pk):
    item = get_object_or_404(WishlistItem, pk=pk, user=request.user)
    item.delete()
    return Response(status=204)

# === TASKS === (FBV — GET и POST)
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def tasks_view(request):
    if request.method == 'GET':
        tasks = Task.objects.filter(user=request.user)
        return Response(TaskSerializer(tasks, many=True).data)
    elif request.method == 'POST':
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

# Task — DELETE (опционально)
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_task(request, pk):
    task = get_object_or_404(Task, pk=pk, user=request.user)
    task.delete()
    return Response(status=204)
