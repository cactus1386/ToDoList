from rest_framework.generics import ListCreateAPIView
from .serializers import *
from .models import *

class ToDoListView(ListCreateAPIView):
    serializer_class = DayListSerializer
    queryset = DayList.objects.all()