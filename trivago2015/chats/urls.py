from django.conf.urls import include, url

from . import views


urlpatterns = [
   url(regex=r'^messages/(?P<event_id>\d+)/$', view=views.get_messages, name="get_messages"),
   url(regex=r'^post/(?P<event_id>\d+)/$', view=views.post_message, name="post_message"),
]
