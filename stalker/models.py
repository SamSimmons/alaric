from django.db import models
from taggit.managers import TaggableManager

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

class Grappler(models.Model):
    name = models.CharField(max_length=50, unique=True)
    avatar = models.ImageField(upload_to="avatars/", blank=True)

    def __str__(self):
        return self.name


class Clip(models.Model):
    grappler = models.ForeignKey(Grappler)
    opponenent = models.CharField(max_length=250, default='')
    video = models.FileField(upload_to='uploads/')
    tags = TaggableManager(blank=True)
