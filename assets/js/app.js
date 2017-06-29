function initMap() {
	var posInicial = {lat: -13.363, lng: 31.044};
	var map = new google.maps.Map(document.getElementById('map'), {
	  zoom: 4,
	  center: posInicial
	});

    // ubicarme.
  var markadorUbicame;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      markadorUbicame = new google.maps.Marker({
  		  position: pos,
  		  map: map,  		 
  		});

      map.setCenter(pos);
      map.setZoom(13);

    });
  } else {
    // Browser doesn't support Geolocation
    alert("tu navegador no es compatible con Geolocation");
  }

  //Autocompletado
  var partida = document.getElementById("punto-partida");
  var llegada = document.getElementById("punto-llegada");

  new google.maps.places.Autocomplete(partida);
  new google.maps.places.Autocomplete(llegada);

  //Trazar ruta
 

  document.getElementById("trazar").addEventListener("click",function(e){
    e.preventDefault();

    var directionsDisplay = new google.maps.DirectionsRenderer();
    var directionsService = new google.maps.DirectionsService();
    
    directionsService.route(
      {
        origin: partida.value,
        destination: llegada.value,
        travelMode: 'DRIVING' 
      }, 
      function(response, status) {
        if (status == "OK") {
          directionsDisplay.setMap(map); 
          markadorUbicame.setMap(null);                 
          directionsDisplay.setDirections(response);
          console.log(response.routes[0].legs[0].distance.text);
          var km = response.routes[0].legs[0].distance.text.replace(",",".").replace("km","")*1.75;

          document.getElementById("km").classList.remove("invisible");
          document.getElementById("km").innerHTML = "S/."+parseInt(km);
        } else {
            alert("No existen rutas entre ambos puntos");
        }
      }
    );
  });
}
