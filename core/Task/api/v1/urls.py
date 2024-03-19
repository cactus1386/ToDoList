from django.urls import path
from .views import get_tasks, create_task, update_tasks

urlpatterns = [
    path('api/v1/tasks/', get_tasks, name='get_tasks'),
    path('api/v1/tasks/create/', create_task, name='create_task'),
    path('api/v1/tasks/<int:task_id>/', update_tasks, name='update_tasks'),
]
