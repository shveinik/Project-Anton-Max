$(document).ready(function(){
  console.log("ready");

  if ($(window).width() < 400 || $(window).height() < 700) {
    $("#loginSquare").css("height", 100);
    $("#loginSquare").css("width", 100);
    console.log("!!!!!");

    }
});
