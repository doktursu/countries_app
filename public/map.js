var Map = function(latLng){
  this.googleMap = new google.maps.Map(document.querySelector('#map'), {
    center: latLng,
    zoom: 5
  });
};

Map.prototype = {
  setCentre: function(latLng){
    this.googleMap.panTo(latLng);
  },
  addMarker: function(latLng, title){
    var marker = new google.maps.Marker({
      map: this.googleMap,
      position: latLng,
      title: title
    });
    return marker;
  },
  addInfoWindow: function(latLng, country){
    var marker = this.addMarker(latLng, country.name);
    marker.addListener('click', function(){
      var infoWindow = new google.maps.InfoWindow({
        content: '<h3>' + country.name + '</h3><h4>' + country.nativeName + '</h4>'
      });
      infoWindow.open(this.map, marker);
    });
  }
}