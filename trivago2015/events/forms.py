import logging

from django import forms

from crispy_forms.helper import FormHelper
from crispy_forms.layout import Submit
from crispy_forms.layout import Layout

from crispy_forms.bootstrap import FormActions
from crispy_forms.bootstrap import StrictButton

from .models import Event

logger = logging.getLogger(__name__)


class EventCreationForm(forms.ModelForm):

    def __init__(self, *args, **kwargs):
        super(EventCreationForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_class = 'form-horizontal'
        self.helper.form_action = "events:create_event"
        self.helper.add_input(Submit('submit', 'Submit'))

    class Meta:
        model = Event
        fields = ("title", "description")
