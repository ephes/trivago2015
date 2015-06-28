import json
import datetime

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from trivago2015.events.models import Event
from .models import Message


def get_messages(request, event_id):
    try:
        event = Event.objects.get(id=event_id)
    except Event.DoesNotExist:
        return JsonResponse(
            {"error": "Event not found"},
            status=404
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
