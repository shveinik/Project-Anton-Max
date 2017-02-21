$.ajax({
  url:     'http://localhost:3000/all/offers',
 type:    'GET',
 success: function (response) {
    myOffers = response;
   // Create and Initialize Map
   const map = new google.maps.Map(document.getElementById('map'), {
     zoom: 15,
     center: {lat: 40.417080, lng: -3.703612}
   });
  //geocoder constructor
  var geocoder = new google.maps.Geocoder();

    myOffers.forEach(function(offer){
     let title = offer.name;
     let address = offer.location;
     geocoder.geocode( { 'address': address}, function(results, status) {
       if (status == google.maps.GeocoderStatus.OK) {
         var marker = new google.maps.Marker({
             title: title,
             map: map,
             position: results[0].geometry.location,
         });
       } else {
         alert('Geocode was not successful for the following reason: ' + status);
       }
     });
   });
 },
 error: function (err) {console.log(err);}
});
