var CountriesList = function(){
  this.countres = [];
  this.onUpdate = undefined;
};

CountriesList.prototype = {
  populate: function(){
    var url = 'https://restcountries.eu/rest/v1/all';
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.onload = function(){
      if(request.status === 200){
        var countries = JSON.parse(request.responseText);
        this.countries = countries;
        this.onUpdate(countries);
      }
    }.bind(this);
    request.send(null);
    return;
  },
  unique: function(prop){
    return this.countries.reduce(function(arr, country){
      if(!arr.includes(country[prop]))
        arr.push(country[prop]);
      return arr;
    }, []);
  },
  filter: function(prop, value){
    if(value != false) {
      return this.countries.reduce(function(arr, country){
        if(country[prop].includes(value)){
          arr.push(country);
        }
        return arr;
      }, []);
    }else{
      return this.countries.reduce(function(arr, country){
        if(country[prop] == false){
          arr.push(country);
        }
        return arr;
      }, []);
    }
  },
  bordering: function(myCountry){
    return this.countries.reduce(function(arr, country){
      if(myCountry.borders.includes(country.alpha3Code))
        arr.push(country);
      return arr;
    }, []);
  }
};