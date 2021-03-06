# -*- coding: utf-8 -*-
from __future__ import unicode_literals, absolute_import

from django.contrib.auth.models import AbstractUser
from django.db import models
# from django.utils.translation import ugettext_lazy as _


class User(AbstractUser):

    def __unicode__(self):
        return self.username


class UserProfile(models.Model):
    user = models.OneToOneField(User, related_name='profile')

    image = models.ImageField(upload_to="image", default=None, null=True)
