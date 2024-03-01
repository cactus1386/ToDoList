from django.db import models

# Create your models here.
class IsComplete(models.Model):
    related = models.ForeignKey('TaskList', on_delete=models.CASCADE, related_name='check-set')
    is_complete = models.BooleanField(default=False)
    

class TaskList(models.Model):
    related = models.ForeignKey('DayList', on_delete=models.CASCADE, related_name='task-set')
    task = models.CharField(max_length=255)

    def __str__(self):
        return self.task

    
class DayList(models.Model):
    title = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    
# class CompleteCheck(models.Model):
#     is_complete = models.BooleanField(default=False)
#     # related = models.ForeignKey(DayList, on_delete=models.CASCADE, related_name='complete-check')

#     def __str__(self):
#         return self.is_complete
    