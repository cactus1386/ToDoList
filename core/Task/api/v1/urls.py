from django.urls import path
from .views import *

urlpatterns = [
    path("v1/task/", ToDoListView.as_view(), name='task-list'),
]
