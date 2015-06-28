$(".forward").click(function(){
  var order = $(this).attr("data-order");
  var newOrder = parseInt(order)+1;
  if(newOrder>maxOrder){
    newOrder = 1;
  }
  var newPageId = '#people-'+newOrder;
  $.mobile.changePage($(newPageId), {transition:"slide"});
});


$(".back").click(function(){
  var order = $(this).attr("data-order");
  var newOrder = parseInt(order)-1;
  if(newOrder>maxOrder){
    newOrder = 1;
  }
  var newPageId = '#people-'+newOrder;
  $.mobile.changePage($(newPageId), {transition:"slide"});
});

$("#chat-submit").click(function(){
  var textValue = $("#chat-input-form").val();
  var bubbleMarkup = "<div class='my-blob'>"+textValue+"</div>";
  $("#chat-content").append(bubbleMarkup);
  $("#chat-input-form").val("");
});



$("#btn-find-events").click(function() {
  var prefs = [];
  $("#preference-list").find("input:checked").each(function() {
    var id = $(this).attr("id");
    prefs.push($("#preference-list").find("label[for='" + id + "']").text());
  });
  $.ajax("/events/fetch/", {
    "dataType": "json",
    "method": "POST",
    "data": JSON.stringify({
      "preferences": prefs
    }),
    "processData": false,
    "success": function(data) {
      var response = data;
      for(var i= 0; i < response.length; i++) {
        var title = response[i].title;
        var categories = [];
        if (response[i].categories.length) {
          var categories = response[i].categories;
        }
        var description = response[i].description;
        var image = response[i].image;

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

        var eventMarkup = '<div data-role="page" id="page-event-' + i + '" data-theme="a" class="page-events">' +
          '<div data-role="header">' +
            '<a href="#page-browse" class="ui-btn ui-shadow ui-corner-all ui-btn-inline ui-icon-back ui-btn-icon-left"></a>' +
            '<h1>' + title + '</h1>' +
          '</div>' +
          '<!-- /header -->' +

          '<div role="main" class="ui-content" style="padding:0;">' +
            '<div class="people-image">' +
              '<img src="' + image + '" />' +
            '</div>' + previous_str +
            '<img class="top" data-order="' + i + '" src="/static/images/icons/top.png" />' + next_str +
            '<div class="people-txt">' +
              '<p>' + description + '</p>' +
              '<p class="category-title">Categories:</p>' +
              '<ul class="categories">' + categories_str + '</ul>' +
            '</div>' +
          '</div></div>';
        $("body").append(eventMarkup);
      }

      $.mobile.changePage($("#page-event-0"), {transition:"slide"});
    }
  })
});
