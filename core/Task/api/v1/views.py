from rest_framework.generics import ListCreateAPIView
from .serializers import *
from .models import *

class TaskView(ListCreateAPIView):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()