import os
import json

from pprint import pprint

from django.contrib.auth import get_user_model
from django.core.files.base import File as DjangoFile
from django.core.management.base import BaseCommand, CommandError
from trivago2015.events.models import Event

User = get_user_model()


class Command(BaseCommand):
    help = 'Import events'

    def get_users(self):
        users = {}
        for user in User.objects.all():
            users[user.username] = user
        return users

    def handle(self, *args, **options):
        users = self.get_users()
        with open('data/events.json') as event_file:
            event_data = json.load(event_file)
        for ed in event_data['events']:
            pprint(ed)
            event = Event()
            event.title = ed.get('title')
            event.description = ed.get('description')
            event.owner = users[ed['username']]
            event.categories = ','.join(ed.get('category', []))
            print('event owner: {}'.format(event.owner))
            event.save()
            try:
                self.add_image(event, ed.get('image'))
            except:
                print('broken file: {}'.format(ed['image']))

    def add_image(self, event, image_name):
        with open('data/{}'.format(image_name), 'rb') as image_file:
            my_image = DjangoFile(image_file)
            event.image.save(image_name, my_image)
