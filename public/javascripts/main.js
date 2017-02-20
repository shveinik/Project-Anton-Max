$(document).ready(function(){

///-Map settings
  var ironhackBCN = { lat: 41.3977381,  lng: 2.190471916 };

  const map = new google.maps.Map(document.getElementById('map'), {
  zoom: 14,
  center: ironhackBCN
  });

  if (navigator.geolocation) {
   navigator.geolocation.getCurrentPosition(function (position) {
     const user_location = {
       lat: position.coords.latitude,
       lng: position.coords.longitude
     };

     // Center map with user location
  map.setCenter(user_location);

     // Add a marker for your user location
  var IronHackBCNMarker = new google.maps.Marker({
       position: {
         lat: user_location.lat,
         lng: user_location.lng
       },
       map: map,
       title: "You are here"
     });
   });
 }
///---////



});
