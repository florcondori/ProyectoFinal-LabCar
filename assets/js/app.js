function initMap() {
	var uluru = {lat: -13.363, lng: 31.044};
	var map = new google.maps.Map(document.getElementById('map'), {
	  zoom: 4,
	  center: uluru
	});

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        map.setCenter(pos);
        var marker = new google.maps.Marker({
		  position: pos,
		  map: map,
		  zoom : 18
		});
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }


}
