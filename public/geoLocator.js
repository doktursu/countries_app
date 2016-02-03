var GeoLocator = function(map){
  this.map = map;
  this.onClick = undefined;
  this.buttonElement = document.querySelector('#myLocation');
  this.buttonElement.addEventListener('click', function(){
    this.onClick();
  }.bind(this));
};

GeoLocator.prototype = {
  setMapCentre: function(){
    console.log('clicked');
    navigator.geolocation.getCurrentPosition(function(position){
      console.log('position', position);
    var centre = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    this.map.setCentre(centre);
    }.bind(this));
  }
};
