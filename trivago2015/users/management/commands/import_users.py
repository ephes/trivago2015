import os
import json

from pprint import pprint

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand, CommandError
from trivago2015.users.models import UserProfile

User = get_user_model()


class Command(BaseCommand):
    help = 'Import events'

    def handle(self, *args, **options):
        with open('data/users.json') as users_file:
            users_data = json.load(users_file)
        for ud in users_data['results']:
            pprint(ud)
            ud = ud['user']
            user = User()
            user.username = ud['username']
            user.set_password(ud['password'])
            user.email = ud['email']
            user.save()
