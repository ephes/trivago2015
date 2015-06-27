from django.db import models
from django.conf import settings


class Event(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='owner')
    description = models.CharField(max_length=500, default=None, null=True)
    start = models.DateTimeField(default=None, null=True)
    end = models.DateTimeField(default=None, null=True)
