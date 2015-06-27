# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.utils.timezone import utc
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('chats', '0002_auto_20150627_1237'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2015, 6, 27, 13, 0, 17, 981503, tzinfo=utc), auto_now_add=True, db_index=True),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='message',
            name='text',
            field=models.CharField(null=True, default=None, max_length=250),
        ),
    ]
