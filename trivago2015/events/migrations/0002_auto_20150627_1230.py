# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='end',
            field=models.DateTimeField(null=True, default=None),
        ),
        migrations.AlterField(
            model_name='event',
            name='start',
            field=models.DateTimeField(null=True, default=None),
        ),
    ]
