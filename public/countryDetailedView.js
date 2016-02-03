var CountryDetailedView = function(element){
  this.element = element;
  this.onClick = undefined;
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
    bordering.innerHTML = '';
    for(country of countries){
      var button = this.borderButton(country);
      bordering.appendChild(button);
    }
  },
  borderButton: function(country){
    var button = document.createElement('button');
    button.innerText = country.name;
    //Not Working
    button.addEventListener('click', function(){
      console.log('clicked', country.name);
      this.onClick(country);
    }.bind(this), false);
    return button;
  }

};