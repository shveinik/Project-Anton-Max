$(document).ready(function(){
  console.log("ready");

  if ($(window).width() < 600 && $(window).height() < 400) {
    $("#loginSquare").css({"height": 600},{"width": 600});
    }
});
