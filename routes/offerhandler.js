// class APIHandler {
//   constructor (baseUrl) {
//     this.BASE_URL = baseUrl;
//   }
//   getFullList() {
//     $.ajax({
//      type:    'GET',
//      url:     `${this.BASE_URL}/all/offers`,
//      success: function (response) {
//        $("#1").change(function() {
//          if($("input[name='ColdFermChamb']").is(":checked")) {
//            myOffers = response;
//            myOffers.forEach(function(offer){
//              let title = offer.name;
//              let address = offer.location;
//              geocoder.geocode( { 'address': address}, function(results, status) {
//                if (status == google.maps.GeocoderStatus.OK) {
//                  var marker = new google.maps.Marker({
//                    title: title,
//                    map: map,
//                    position: results[0].geometry.location,
//                  });
//                  markers.push(marker);
//                } else {
//                  alert('Geocode was not successful for the following reason: ' + status);
//                }
//              });
//            });
//          } else if (!$("input[name='ColdFermChamb']").is(":checked")){
//            setMapOnAll(null);
//          }
//        });
//      },
//      error: function (err) {console.log(err);}
//     });
//    }
// }
