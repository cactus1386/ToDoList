from rest_framework import serializers
from .models import *

class IsCompleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = IsComplete
        fields = ('id', 'is_complete')

class TaskListSerializer(serializers.ModelSerializer):
    is_complete = IsCompleteSerializer(source='check-set')
    class Meta:
        model = TaskList
        fields = ('id', 'task')

class DayListSerializer(serializers.ModelSerializer):
    task = TaskListSerializer(many=True, read_only=True, source='task-set')
    class Meta:
        model = DayList
        fields = ('id', 'title', 'task')