# -*- coding: utf-8 -*-

from django.conf.urls import include, url

from . import views

urlpatterns = [
    url(regex=r'^fetch/$', view=views.fetch_events, name="fetch_events"),
    url(regex=r'^create_form/$', view=views.EventCreateView.as_view(), name="create_event_form"),
    url(regex=r'^create/$', view=views.create_event, name="create_event"),
]
