import os
import json
from datetime import datetime

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
            event.location = ed.get('location', [])[1]
            print(event.location)
            event.start = datetime.strptime(ed.get('start'), '%d.%m.%Y %H:%M')
            event.ende = ed.get('ende')
            if event.ende:
                event.ende = datetime.strptime(ed.get('ende'), '%d.%m.%Y %H:%M')      
                print(event.ende)
                
            event.categories = ','.join(ed.get('category', []))
            print(event.categories)
            event.owner = users[ed['username']]
            
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
