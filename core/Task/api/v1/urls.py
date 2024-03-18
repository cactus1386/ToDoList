from django.urls import path
from .views import get_tasks, create_task

urlpatterns = [
    path('api/v1/tasks/', get_tasks, name='get_tasks'),
    path('api/v1/tasks/create/', create_task, name='create_task'),
]
