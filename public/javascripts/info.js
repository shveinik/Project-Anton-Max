$(document).ready(function(){
  $("#infoFooter").hide();
  $("#info").click(function(){
    $("#map").toggle(500);
    $("#infoFooter").toggle(500);
    $("#infoFooter").css("background-image","url(https://s-media-cache-ak0.pinimg.com/originals/98/ed/c3/98edc37f1c0bb19584cd76e71e198aab.jpg)");
});

});
