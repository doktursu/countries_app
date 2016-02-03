var CountriesSelectView = function(selectElement){
  this.selectElement = selectElement;
  this.onChange = undefined;
  this.selectElement.addEventListener('change', function(e){
    var JSONString = this.selectElement.value;
    var country = JSON.parse(JSONString)
    this.onChange(country);
  }.bind(this));
};

CountriesSelectView.prototype = {
  populate: function(countries){
    this.selectElement.innerHTML = '';
    for(country of countries){
      var option = document.createElement('option');
      option.value = JSON.stringify(country);
      option.text = country.name;
      this.selectElement.appendChild(option);
    }
  }
};