import names

from django.contrib.auth import authenticate, login
from django.contrib.auth import get_user_model
from django.http import HttpResponseRedirect


User = get_user_model()


class RandomUserMiddleware(object):
    def process_request(self, request):
        if not request.user.is_authenticated():
            full_name = names.get_full_name()
            username = full_name.lower().replace(' ', '')
            User.objects.create_user(
                username=username,
                email="%s@gmail.com" % username,
                first_name=full_name.split(' ')[0],
                last_name=full_name.split(' ')[1],
                password="travelBuddy"
            )
<<<<<<< Updated upstream
            user = authenticate(username=username, password="travelBuddy")
            login(request, user)
            return HttpResponseRedirect(request.path)
=======
            request.user = user
>>>>>>> Stashed changes


class DisableCSRF(object):
    def process_request(self, request):
        setattr(request, '_dont_enforce_csrf_checks', True)
