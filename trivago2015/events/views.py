import json
import logging

from django.shortcuts import render
from django.http import HttpResponse

from django.views.generic import TemplateView

from .models import Event


logger = logging.getLogger(__name__)


class EventCreateView(TemplateView):
    template_name = "events/create.html"


def fetch_events(request):
    """
    Return Events-Resultset in json format.
    """
    logger.info("request post: {}".format(request.POST))
    logger.info("request get: {}".format(request.GET))
    categories = set([request.GET["foo"],])
    logger.info('categories: {}'.format(categories))
    events = Event.objects.all()
    result = []
    for event in Event.objects.all():
        e_categories = set(event.categories.split(','))
        logger.info("ecategories: {}".format(e_categories))
        intersection = categories.intersection(e_categories)
        logger.info("intersection: {}".format(intersection))
        if len(intersection) > 0:
            result.append({
                'title': event.title,
                'description': event.description,
            })
    json_response = json.dumps(result)
    return HttpResponse(json_response, content_type="application/json")


def create_event(request):
    """
    Create a new event
    """
    json_response = json.dumps('ok')
    return HttpResponse(json_response, content_type="application/json")
