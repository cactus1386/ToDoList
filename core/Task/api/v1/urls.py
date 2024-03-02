from django.urls import path
from .views import *

urlpatterns = [
    path('v1/list/', TaskView.as_view(), name='task-list'),
]
