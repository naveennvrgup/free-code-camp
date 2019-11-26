
$("#all").click(function(){
  $("#channels div").show();
});

$("#online").click(function(){
  $("#channels div").show();
  $(".inactive").hide();
});

$("#offline").click(function(){
  $("#channels div").hide();
  $(".inactive").show();
});
