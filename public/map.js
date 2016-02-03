var Map = function(latLng){
  this.googleMap = new google.maps.Map(document.querySelector('#map'), {
    center: latLng,
    zoom: 5
  });
};