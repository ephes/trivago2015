import json
import logging

from django.shortcuts import render
from django.http import HttpResponse


logger = logging.getLogger(__name__)


def fetch_events(request):
    """
    Return Events-Resultset in json format.
    """
    logger.info("request post: {}".format(request.POST))
    result = []
    json_response = json.dumps(result)
    return HttpResponse(json_response, content_type="application/json")
