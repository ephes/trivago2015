import os
import json
import requests

from pprint import pprint

from django.core.files import File as DjangoFile
from django.core.files.temp import NamedTemporaryFile

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
            user_profile = UserProfile(user=user)
            user_profile.save()
            self.add_image(user_profile, ud['picture']['large'])

    def add_image(self, user_profile, image_url):
        r = requests.get(image_url)

        img_temp = NamedTemporaryFile(delete=True)
        img_temp.write(r.content)
        img_temp.flush()

        user_profile.image.save("image.jpg", DjangoFile(img_temp), save=True)
