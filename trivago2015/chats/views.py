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

    return JsonResponse({
        "count": Message.objects.filter(event=event).count(),
        "results": [{
            "text": x.text,
            "author": x.author.username,
            "created_at": x.created_at.isoformat()
        } for x in Message.objects.filter(event=event)]
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

    print(request.method, request.POST)
    if not request.POST.get('text', None):
        return JsonResponse(
            {"error": "Please provide text"}
        )

    msg = Message()
    msg.event = event
    msg.author = request.user
    msg.text = request.POST.get('text', None)
    msg.save()

    return JsonResponse({
        "status": "success",
        "created_at": msg.created_at
    })
