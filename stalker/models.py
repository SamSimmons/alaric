from django.db import models

class Match(models.Model):
    title = models.CharField(max_length=50)
    grappler_one = models.CharField(max_length=50)
    grappler_two = models.CharField(max_length=50)
    date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    duration = models.DurationField(null=True)

    def __str__(self):
        return self.title
