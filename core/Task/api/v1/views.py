from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Task
from .serializers import TaskSerializer


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_task(request):
    if request.method == 'POST':
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_tasks(request):
    if request.method == 'GET':
        tasks = Task.objects.filter(author=request.user)
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_tasks(request, task_id):
    try:
        task = Task.objects.get(pk=task_id)
    except Task.DoesNotExist:
        return Response(status=status.HTTP_404_NOTFound)

    if request.method == 'PUT':
        is_complete = request.data.get('is_complete', None)
        if is_complete is not None:
            task.is_complete = is_complete
            task.save()
            serializer = TaskSerializer(task)
            return Response(serializer.data)

        else:
            return Response(status=HTTP_400_BAD_REQUEST)
