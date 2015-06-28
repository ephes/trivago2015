var chat_refresh_timeout = false;

var handle_message_send_response = function(data) {
  var textValue = $("#chat-input-form").val();
  var bubbleMarkup = '<div class="blob my-blob" data-created="' + data.created_at + '">' + textValue + '</div>';
  $("#chat-content").append(bubbleMarkup);
  $("#chat-input-form").val('');
}

$("#chat-submit").click(function() {
  var eventid = $('#page-chat #input-event-id').val();
  var textValue = $("#chat-input-form").val();
  $.ajax('/chats/post/' + eventid + '/', {
    'method': 'POST',
    'data': JSON.stringify({
      'text': textValue
    }),
    'processData': false,
    'success': handle_message_send_response
  });
});

var handle_events_data = function(data) {
  var response = data;
  for(var i= 0; i < response.length; i++) {
    var ev = response[i];
    var title = ev.title;
    var categories = [];
    if (ev.categories.length) {
      var categories = ev.categories;
    }
    var description = ev.description;
    var image = ev.image;

    var categories_str = '';
    for(var j= 0; j < categories.length; j++) {
      categories_str = categories_str + '<li><img class="icon" src="/static/images/icons/' + categories[j] + '.png" /></li>';
    }

    var previous_str = '';
    if (i != 0) {
      previous_str = '<a class="back" href="#page-event-' + (i - 1) + '">' +
        '<img src="/static/images/icons/back.png" />' +
      '</a>'
    }

    var next_str = '';
    if (i != (response.length - 1)) {
      next_str = '<a class="forward" href="#page-event-' + (i + 1) + '">' +
        '<img src="/static/images/icons/forward.png" />' +
      '</a>'
    }

    var eventMarkup = '<div data-role="page" id="page-event-' + i + '" data-theme="a" class="page-events" data-event="' + ev.id + '">' +
      '<div data-role="header">' +
        '<a href="#page-browse" class="ui-btn ui-shadow ui-corner-all ui-btn-inline ui-icon-back ui-btn-icon-left"></a>' +
        '<h1>' + title + '</h1>' +
      '</div>' +
      '<!-- /header -->' +

      '<div role="main" class="ui-content" style="padding:0;">' +
        '<div class="people-image">' +
          '<img src="' + image + '" />' +
        '</div>' + previous_str +
        '<a href="#page-chat" id="btn-load-chat" data-event="' + ev.id + '">' +
          '<img class="top" src="/static/images/icons/top.png" />' + next_str +
        '</a>' +
        '<div class="people-txt">' +
          '<p>' + description + '</p>' +
          '<p class="category-title">Categories:</p>' +
          '<ul class="categories">' + categories_str + '</ul>' +
        '</div>' +
      '</div></div>';
    $("body").append(eventMarkup);
    $('#page-event-' + i + ' #btn-load-chat').click(function() {
      $('#page-chat #input-event-id').val($(this).data('event'));
      $.mobile.changePage($($(this).attr('id')), {transition:"slide"});
    });
  }

  if ($('#page-event-0').length) {
    $.mobile.changePage($("#page-event-0"), {transition:"slide"});
  }
}

$("#btn-find-events").click(function() {
  var prefs = [];
  $("#preference-list").find("input:checked").each(function() {
    var id = $(this).attr("id");
    prefs.push($("#preference-list").find("label[for='" + id + "']").text());
  });
  $('div.page-events').remove();
  $.ajax("/events/fetch/", {
    "dataType": "json",
    "method": "POST",
    "data": JSON.stringify({
      "preferences": prefs
    }),
    "processData": false,
    "success": handle_events_data
  })
});


var handle_chat_data = function(data) {
  chats = data.results;
  for (var i = 0; i < chats.length; i++) {
    var chat = chats[i];
    $("#chat-content").append('<div class="blob your-blob" data-created="' + chat.created_at + '">' + chat.text + '</div>');
  }
}


var check_new_messages = function() {
  var eventid = $('#page-chat #input-event-id').val();
  var last = $('#chat-content .blob').last().data('created') || false;
  $.ajax('/chats/messages/' + eventid + '/?last=' + last, {
    'method': 'GET',
    'success': handle_chat_data,
    'dataType': 'JSON'
  });
  chat_refresh_timeout = setTimeout(check_new_messages, 3000);
}

$('#page-chat').on('pagebeforeshow', function(event) {
  chat_refresh_timeout = setTimeout(check_new_messages, 1000);
});
