from django.db import models
from django.conf import settings

from trivago2015.events.models import Event


class Message(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='author')
    event = models.ForeignKey(Event, related_name='event')
    text = models.CharField(max_length=500, default=None, null=True)
