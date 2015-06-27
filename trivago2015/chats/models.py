from django.db import models
from django.conf import settings


class Message(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='author')
    text = models.CharField(max_length=500, default=None, null=True)
