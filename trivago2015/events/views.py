import json
import logging

from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from django.views.generic import FormView
from django.views.generic import CreateView
from django.views.generic import TemplateView

from .models import Event
from .forms import EventCreationForm

logger = logging.getLogger(__name__)


class EventCreateView(CreateView):
    """
    Create event
    """
    model = Event
    template_name = "events/create.html"
    form_class = EventCreationForm
    form_invalid_message = "Event create form invalid"
    form_valid_message = "Event successfully created!"

    def post(self, request, *args, **kwargs):
        logger.info("event create post: {}".format(request.POST))
        response = super(EventCreateView, self).post(request, *args, **kwargs)
        return response

    def dispatch(self, request, *args, **kwargs):
        logger.info("dispatch post: {}".format(request.POST))
        return super(EventCreateView, self).dispatch(request, *args, **kwargs)


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


@csrf_exempt
def create_event(request):
    """
    Create a new event
    """
    logger.info("request scheme: {}".format(request.method))
    logger.info("event create post: {}".format(request.POST))
    logger.info("event create get: {}".format(request.GET))
    json_response = json.dumps('ok')
    return HttpResponse(json_response, content_type="application/json")
