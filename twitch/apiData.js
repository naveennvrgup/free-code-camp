
//given information
var ids = ["ESL_SC2",  "cretetion", "freecodecamp", "storbeck", "habathcx","OgamingSC2", "Monstercat", "noobs2ninjas"];
var streams = "https://wind-bow.gomix.me/twitch-api/streams/";
var users = "https://wind-bow.gomix.me/twitch-api/users/";

var h3 = $("#channels div h3");
var p = $("#channels div p");
var img = $("#channels div img");
var a = $("#channels div a");

j = 0;

function next(){
  return j++;
}

ids.forEach(function(id){
  var url = streams + id + "?callback=?";
  var i = next();
  //get the data from the api
  $.getJSON(url, function(data){
    if(data.stream != null){
      h3[i].innerHTML=data.stream.channel.display_name;
      p[i].innerHTML=data.stream.channel.status;
      img[i].setAttribute("src",data.stream.channel.logo);
      $(a[i]).attr("href","https://www.twitch.tv/" + id);
    }else{
      failed(i,id);
    }
  });

});

function failed(i,id){
  url = users + id + "?callback=?";

  $.getJSON(url, function(data){
    $(p[i]).text("inactive").parent().addClass("inactive");
    h3[i].innerHTML=data.display_name;
    img[i].setAttribute("src",data.logo);
    $(a[i]).attr("href","https://www.twitch.tv/" + id);
  });
}
