from rest_framework.generics import ListCreateAPIView
from .serializers import *
from .models import *
from rest_framework import permissions


class TaskView(ListCreateAPIView):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
    permission_classes = [permissions.IsAuthenticated]
