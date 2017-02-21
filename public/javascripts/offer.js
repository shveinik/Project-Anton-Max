$.ajax({
  url:     'http://localhost:3000/offer',
 type:    'GET',
 success: function (response) {
   // Create and Initialize Map
   const map = new google.maps.Map(document.getElementById('map'), {
     zoom: 15,
     center: {lat: 40.417080, lng: -3.703612}
   });

   //Autocomplete Search
   var input = document.getElementById('location');
   var autocomplete = new google.maps.places.Autocomplete(input);

   //Updates Map
   var infowindow = new google.maps.InfoWindow();
   var marker = new google.maps.Marker({
     map: map
   });

   google.maps.event.addListener(autocomplete, 'place_changed', function() {
     infowindow.close();
     var place = autocomplete.getPlace();
     console.log(place.formatted_address);
     console.log($( "input[id='location']" ));
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
     infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
         'Place ID: ' + place.place_id + '<br>' +
         place.formatted_address + '</div>');
     infowindow.open(map, marker);
   });
 },
 error: function (err) {console.log(err);}
});
