$.ajax({
 url:     'http://localhost:3000/all/equipment',
 type:    'GET',
 success: function (response) {
    myOffers = response;
    markers =[];
   // Create and Initialize Map
   const map = new google.maps.Map(document.getElementById('map'), {
     zoom: 5,
     center: {lat: 40.417080, lng: -3.703612}
   });
   var infowindow = new google.maps.InfoWindow({});

  //geocoder constructor
  var geocoder = new google.maps.Geocoder();
  function setMapOnAll(map) {
       for (var i = 0; i < markers.length; i++) {
         markers[i].setMap(map);
       }
     }
     myOffers.forEach(function(gear){
       let title = gear.name;
       let address = gear.location;
       let equipment = gear.equipment;
       geocoder.geocode( {'address': address}, function(results, status) {
         if (status == google.maps.GeocoderStatus.OK) {
           var marker = new google.maps.Marker({
             title: title,
             map: map,
             position: results[0].geometry.location,
              id : 'id'
          });
          if(equipment.length > 1){
           marker.setIcon("http://maps.google.com/mapfiles/kml/pal3/icon20.png");
           console.log("here is more than 2");
         }else{
          if(equipment[0] === "HotFermChamb"){
           marker.setIcon("http://maps.google.com/mapfiles/kml/pal3/icon0.png");

           }
           if(equipment[0] === "ColdFermChamb"){
            marker.setIcon("http://maps.google.com/mapfiles/kml/pal3/icon1.png");
            }
            if(equipment[0] === "Mill"){
             marker.setIcon("http://maps.google.com/mapfiles/kml/pal3/icon2.png");
             }
             if(equipment[0] === "Press"){
              marker.setIcon("http://maps.google.com/mapfiles/kml/pal3/icon3.png");
              }
              if(equipment[0] === "Full"){
               marker.setIcon("http://maps.google.com/mapfiles/kml/pal3/icon4.png");
             }}

             marker.setVisible(false);

           markers.push(marker);

          //  var contentString = "<a href =<%= offer._id %>>";

           var infowindow = new google.maps.InfoWindow({
             content: gear._id
           });
           marker.addListener('mouseover', function() {
           infowindow.open(map, marker);
        });
        marker.addListener('mouseout', function() {
        infowindow.close(map, marker);
     });
     marker.addListener('click', function() {
     location.href = "/gear/" + gear._id;
  });
      var myButton1 = document.getElementById('1');
      var myButton2 = document.getElementById('2');
      var myButton3 = document.getElementById('3');
      var myButton4 = document.getElementById('4');
      var myButton5 = document.getElementById('5');
      var myButton6 = document.getElementById('6');

     google.maps.event.addDomListener(myButton1, 'change', function() {
       if(myButton1.checked === true){ if(marker.icon == "http://maps.google.com/mapfiles/kml/pal3/icon1.png"){
      marker.setVisible(true);}}
       if(myButton1.checked === false){ if(marker.icon == "http://maps.google.com/mapfiles/kml/pal3/icon1.png"){
      marker.setVisible(false);}}
    });

      google.maps.event.addDomListener(myButton2, 'change', function() {
        if(myButton2.checked === true){if(marker.icon == "http://maps.google.com/mapfiles/kml/pal3/icon0.png"){
       marker.setVisible(true);}}
        if(myButton2.checked === false){if(marker.icon == "http://maps.google.com/mapfiles/kml/pal3/icon0.png"){
       marker.setVisible(false);}}

 });
       google.maps.event.addDomListener(myButton3, 'change', function() {
         if(myButton3.checked === true){if(marker.icon == "http://maps.google.com/mapfiles/kml/pal3/icon2.png"){
        marker.setVisible(true);}}
         if(myButton3.checked === false){if(marker.icon == "http://maps.google.com/mapfiles/kml/pal3/icon2.png"){
        marker.setVisible(false);}}

      });
      google.maps.event.addDomListener(myButton4, 'change', function() {
        if(myButton4.checked === true){if(marker.icon == "http://maps.google.com/mapfiles/kml/pal3/icon3.png"){
       marker.setVisible(true);}}
        if(myButton4.checked === false){if(marker.icon == "http://maps.google.com/mapfiles/kml/pal3/icon3.png"){
       marker.setVisible(false);}}

     });
     google.maps.event.addDomListener(myButton5, 'change', function() {
       if(myButton5.checked === true){if(marker.icon == "http://maps.google.com/mapfiles/kml/pal3/icon4.png"){
      marker.setVisible(true);}}
       if(myButton5.checked === false){if(marker.icon == "http://maps.google.com/mapfiles/kml/pal3/icon4.png"){
      marker.setVisible(false);}}

    });
    google.maps.event.addDomListener(myButton6, 'change', function() {
      if(myButton6.checked === true){if(marker.icon == "http://maps.google.com/mapfiles/kml/pal3/icon5.png"){
     marker.setVisible(true);}}
      if(myButton6.checked === false){if(marker.icon == "http://maps.google.com/mapfiles/kml/pal3/icon5.png"){
     marker.setVisible(false);}}

   });
         } else {
           alert('Geocode was not successful for the following reason: ' + status);
         }
       });

     });

 },
 error: function (err) {console.log(err);}
});
