import json
import datetime
import random

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model

from trivago2015.events.models import Event
from .models import Message


User = get_user_model()

def get_messages(request, event_id):
    try:
        event = Event.objects.get(id=event_id)
    except Event.DoesNotExist:
        return JsonResponse(
            {"error": "Event not found"},
            status=404
        )

    comments = [
        'That is great, lets meet!',
        'When are we meeting? I am excited',
        'See you soon!',
        'Great plan, lets do this :)',
        'Hey it will be nice to do this together!',
        'Awesome, lets do this!',
    ]

    users = [x for x in User.objects.all()]

    Message.objects.create(
        event=event,
        text=random.choice(comments),
        author=random.choice(users)
    )

    last = request.GET.get('last', None)
    if last and last != 'false':
        last = datetime.datetime.strptime(last, '%Y-%m-%dT%H:%M:%S:%f')
        query = Message.objects.filter(event=event, created_at__gt=last)
    else:
        query = Message.objects.filter(event=event)

    return JsonResponse({
        "count": query.count(),
        "results": [{
            "text": x.text,
            "author": x.author.username,
            "created_at": x.created_at.strftime('%Y-%m-%dT%H:%M:%S:%f')
        } for x in query.all()]
    },
    safe=False)


@csrf_exempt
def post_message(request, event_id):
    try:
        event = Event.objects.get(id=event_id)
    except Event.DoesNotExist:
        return JsonResponse(
            {"error": "Event not found"},
            status=404
        )

    data = {}
    try:
        data = json.loads(request.body.decode())
    except ValueError:
        pass
    if not data.get("text", None):
        return JsonResponse(
            {"error": "Please provide text"}
        )

    msg = Message()
    msg.event = event
    msg.author = request.user
    msg.text = data.get('text', None)
    msg.save()

    return JsonResponse({
        "status": "success",
        "created_at": msg.created_at.strftime('%Y-%m-%dT%H:%M:%S:%f')
    })
