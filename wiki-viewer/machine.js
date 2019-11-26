/// <reference path="typings/globals/jquery/index.d.ts" />

function job(){

    //start to make the url
    var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=";
    var stxt = $("#stxt").val();
    url += stxt + "&format=json&origin=*";

    //getting data from the server
    $.get(url, function(data){
        h3 = $("#main-content h3");
        p = $("#main-content p");
        a = $("#main-content a");
        div = $("#main-content div");
        
        //putting data into elements
        for(var i=0;i<10;i++){
            h3[i].innerHTML=data[1][i];
            p[i].innerHTML = data[2][i];
            a[i].setAttribute("href",data[3][i]);
            a[i].setAttribute("target","blank");
        }
    });
    //empty the input box
    $("#stxt").val("");
    //fadein the result
    $("#main-content div").fadeIn(1000);
}   



