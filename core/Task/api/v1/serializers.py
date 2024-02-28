from rest_framework import serializers
from .models import *

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskList
        fields = ('id', 'task')
        
class CompleteCheckSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompleteCheck
        fields = ('id', 'is_complete')

class DayListSerializer(serializers.ModelSerializer):
    task = TaskSerializer(many=True, read_only=True,  source='task-set')
    is_complete = CompleteCheckSerializer(many=True, read_only=True, source='complete-check')
    class Meta:
        model = DayList
        fields = ('id', 'title', 'task', 'is_complete')