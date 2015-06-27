from django.db import models
from django.conf import settings


class Message(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='author')
    event = models.ForeignKey('events.Event')
    text = models.CharField(max_length=250, default=None, null=True)

    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
