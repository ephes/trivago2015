# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(primary_key=True, verbose_name='ID', auto_created=True, serialize=False)),
                ('description', models.CharField(max_length=500, null=True, default=None)),
                ('start', models.DateTimeField(null=True, default=None)),
                ('end', models.DateTimeField(null=True, default=None)),
            ],
        ),
    ]
