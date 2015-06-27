# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0002_auto_20150627_1230'),
        ('chats', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='event',
            field=models.ForeignKey(default=datetime.datetime(2015, 6, 27, 12, 30, 3, 766874, tzinfo=utc), to='events.Event', related_name='event'),
            preserve_default=False,
        ),
    ]
