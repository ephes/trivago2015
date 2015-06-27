var maxOrder = 2;
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
