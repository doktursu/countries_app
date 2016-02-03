var CountryDetailedView = function(element){
  this.element = element;
};

CountryDetailedView.prototype = {
  display: function(country){
    var tags = this.element.querySelectorAll('p');
    tags[0].innerText = country.name;
    tags[1].innerText = country.capital;
    tags[2].innerText = country.population;
  },
  displayBordering: function(countries){
    var bordering = this.element.querySelector('#country-bordering');
    for(country of countries){
      var button = document.createElement('button');
      button.innerText = country.name;
      //Not Working
      button.onClick = function(){
        this.display(country);
      };
      bordering.appendChild(button);
    }
  }
};