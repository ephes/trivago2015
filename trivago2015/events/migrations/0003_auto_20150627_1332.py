# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0002_event_owner'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='categories',
            field=models.CharField(max_length=500, null=True, default=None),
        ),
        migrations.AddField(
            model_name='event',
            name='title',
            field=models.CharField(max_length=100, null=True, default=None),
        ),
    ]
