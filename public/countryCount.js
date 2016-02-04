var CountryCount = function(key){
  this.key = key;
  this.countryCount = document.querySelector('#country-count');
  this.peopleCount = document.querySelector('#people-count');
  this.visited = [];
};

CountryCount.prototype = {
  display: function(country){
    var countries = this.getCountries();
    this.countryCount.innerText = countries.length;
    var population = countries.reduce(function(a, b){
      return {population: a.population + b.population};
    }).population;
    this.peopleCount.innerText = population;
    switch(countries.length){
      case 1:
        alert('Welcome! Try to visit as many countries as you can');
        break;
      case 4:
        alert('4 countries! You are super.');
        break;
      case 10:
        alert('10 countries! W - 0 - W');
        break;
      case 247:
        alert('YOU DID IT!! DONT THINK THIS IS ACTUALLY POSSIBLE');
        break;
    }
  },
  getCountries: function(){
    return JSON.parse(localStorage.getItem(this.key)) || [];
  },
  hasCountry: function(country){
    return this.getCountries().map(function(entry){
      return entry.name;
    }).includes(country.name);
  },
  addCountry: function(country){
    var countries = this.getCountries();
    if(!this.hasCountry(country)){
      countries.push(country);
      localStorage.setItem(this.key, JSON.stringify(countries));
      this.display(country);
    }
  }
};
