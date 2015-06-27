import names
from django.contrib.auth import get_user_model


User = get_user_model()


class RandomUserMiddleware(object):
    def process_request(self, request):
        if 'user' not in request or not request.user.is_authenticated():
            full_name = names.get_full_name()
            user = User.objects.create_user(
                username=full_name.lower().replace(' ', ''),
                email="%s@gmail.com" % full_name.lower().replace(' ', ''),
                first_name=full_name.split(' ')[0],
                last_name=full_name.split(' ')[1],
                password="travelBuddy"
            )
            request.user = user
