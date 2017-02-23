$.ajax({
  url:     'http://localhost:3000/offer',
 type:    'GET',
 success: function (response) {
   // Create and Initialize Map
   const map = new google.maps.Map(document.getElementById('map'), {
     zoom: 5,
     center: {lat: 40.417080, lng: -3.703612}
   });
   //Autocomplete Search
   var input = document.getElementById('location');
   var autocomplete = new google.maps.places.Autocomplete(input);

   //Updates Map
   var marker = new google.maps.Marker({
     map: map,

   });

   google.maps.event.addListener(autocomplete, 'place_changed', function() {
    //  infowindow.close();
     var place = autocomplete.getPlace();
     if (!place.geometry) {
       return;
     }
     if (place.geometry.viewport) {
       map.fitBounds(place.geometry.viewport);
     } else {
       map.setCenter(place.geometry.location);
       map.setZoom(17);
     }
     // Set the position of the marker using the place ID and location.
     marker.setPlace({
      placeId: place.place_id,
      location: place.geometry.location
     });
     marker.setVisible(true);

   });

 },
 error: function (err) {console.log(err);}
});
