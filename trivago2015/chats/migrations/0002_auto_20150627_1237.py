# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('chats', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='author',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL, related_name='author'),
        ),
        migrations.AddField(
            model_name='message',
            name='event',
            field=models.ForeignKey(to='events.Event', related_name='event'),
        ),
    ]
