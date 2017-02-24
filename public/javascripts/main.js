var equipment = $.ajax({
  url:     'http://localhost:3000/all/equipment',
 type:    'GET',
 success: function (response) {
 }
});

var offers = $.ajax({
  url:     'http://localhost:3000/all/offers',
 type:    'GET',
 success: function (response) {}
});

$.when( equipment , offers ).done(function( equipment, offers ) {
   let myGears  = equipment[0];
   let myOffers = offers[0];
   let address;
   var geocoder = new google.maps.Geocoder();
   //Arrays of Pins for each gear
   let coldChamb = [];
   let hotChamb  = [];
   let mill      = [];
   let crusher   = [];
   let press     = [];
   let full      = [];

  // Create and Initialize Map
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: {lat: 40.417080, lng: -3.703612},
    styles: [
              {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
              {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
              {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
              {
                featureType: 'administrative',
                elementType: 'geometry.stroke',
                stylers: [{color: '#c9b2a6'}]
              },
              {
                featureType: 'administrative.land_parcel',
                elementType: 'geometry.stroke',
                stylers: [{color: '#dcd2be'}]
              },
              {
                featureType: 'administrative.land_parcel',
                elementType: 'labels.text.fill',
                stylers: [{color: '#ae9e90'}]
              },
              {
                featureType: 'landscape.natural',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
              },
              {
                featureType: 'poi',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
              },
              {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{color: '#93817c'}]
              },
              {
                featureType: 'poi.park',
                elementType: 'geometry.fill',
                stylers: [{color: '#a5b076'}]
              },
              {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{color: '#447530'}]
              },
              {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{color: '#f5f1e6'}]
              },
              {
                featureType: 'road.arterial',
                elementType: 'geometry',
                stylers: [{color: '#fdfcf8'}]
              },
              {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{color: '#f8c967'}]
              },
              {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{color: '#e9bc62'}]
              },
              {
                featureType: 'road.highway.controlled_access',
                elementType: 'geometry',
                stylers: [{color: '#e98d58'}]
              },
              {
                featureType: 'road.highway.controlled_access',
                elementType: 'geometry.stroke',
                stylers: [{color: '#db8555'}]
              },
              {
                featureType: 'road.local',
                elementType: 'labels.text.fill',
                stylers: [{color: '#806b63'}]
              },
              {
                featureType: 'transit.line',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
              },
              {
                featureType: 'transit.line',
                elementType: 'labels.text.fill',
                stylers: [{color: '#8f7d77'}]
              },
              {
                featureType: 'transit.line',
                elementType: 'labels.text.stroke',
                stylers: [{color: '#ebe3cd'}]
              },
              {
                featureType: 'transit.station',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
              },
              {
                featureType: 'water',
                elementType: 'geometry.fill',
                stylers: [{color: '#b9d3c2'}]
              },
              {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{color: '#92998d'}]
              }
            ],
  });

 //map visibility function
 function setMapOnAll(map, array) {
    for (var i = 0; i < array.length; i++) {
      array[i].setMap(map);
    }
  }

 // map init function
 function mapInit(array, list, png){
   address = list[1];
   geocoder.geocode( { 'address': address }, function(results, status) {

     if (status == google.maps.GeocoderStatus.OK) {
       var marker = new google.maps.Marker({
         map: map,
         position: results[0].geometry.location,
       });
        marker.setIcon("./imgs/" + png + ".png");
       array.push(marker);
       setMapOnAll(null, array);
       marker.addListener('click', function() {
       location.href = "/gear/" + list[2];
       });
     } else {
       alert('Geocode was not successful for the following reason: ' + status);
     }
   });
 }

   myGears.forEach(function(gears){
     var equipments = gears.equipment;
     console.log(gears._id);
     console.log(equipments);
     var eqList = equipments.map(function(equipment){
       return [equipment, gears.location, gears._id];
     });
     console.log(eqList);
     console.log("hello");
     eqList.forEach(function(list){
               if (list[0] == "ColdFermChamb"){
          mapInit(coldChamb, list, "coldChamb");
        } else if (list[0] == "HotFermChamb"){
          mapInit(hotChamb, list, "hotChamb");
        } else if (list[0] == "Mill"){
          mapInit(mill, list, "mill");
        } else if (list[0] == "Crusher"){
          mapInit(crusher, list, "crusher");
        } else if (list[0] == "Press"){
          mapInit(press, list, "press");
        } else if (list[0] == "Full"){
          mapInit(full, list, "full");
       }
     });
   });

   //coldChamb button
    $("#coldChamb").on("click",function() {
      var data = $(this).attr("data");
      if(data === "true") {
        $(this).attr("data", "false");
        setMapOnAll(map, coldChamb);
    } else if (data === "false"){
      $(this).attr("data", "true");
      setMapOnAll(null, coldChamb);}
    });

    //hotChamb button
    $("#hotChamb").on("click",function() {
      var data = $(this).attr("data");
      if(data === "true") {
        $(this).attr("data", "false");
        setMapOnAll(map, hotChamb);
    } else if (data === "false"){
      $(this).attr("data", "true");
      setMapOnAll(null, hotChamb);}
    });

    //mill button
    $("#mill").on("click",function() {
      var data = $(this).attr("data");
      if(data === "true") {
        $(this).attr("data", "false");
        setMapOnAll(map, mill);
    } else if (data === "false"){
      $(this).attr("data", "true");
      setMapOnAll(null, mill);}
    });
    //crusher button
    $("#crusher").on("click",function() {
      var data = $(this).attr("data");
      if(data === "true") {
        $(this).attr("data", "false");
        setMapOnAll(map, crusher);
    } else if (data === "false"){
      $(this).attr("data", "true");
      setMapOnAll(null, crusher);}
    });
    //press button
    $("#press").on("click",function() {
      var data = $(this).attr("data");
      if(data === "true") {
        $(this).attr("data", "false");
        setMapOnAll(map, press);
    } else if (data === "false"){
      $(this).attr("data", "true");
      setMapOnAll(null, press);}
    });
    //full button
    $("#full").on("click",function() {
      var data = $(this).attr("data");
      if(data === "true") {
        $(this).attr("data", "false");
        setMapOnAll(map, full);
    } else if (data === "false"){
      $(this).attr("data", "true");
      setMapOnAll(null, full);}
    });

});
