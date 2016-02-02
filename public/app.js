var CountryView = function(country){
  this.name = document.createElement('h2');
  this.name.innerText = country.name;
  
  this.capital = document.createElement('p');
  this.capital.innerText = 'Capital: ' + country.capital;
  
  this.population = document.createElement('p');
  this.population.innerText = 'Population: ' + country.population;

  this.render = function(parent){
    parent.appendChild(this.name);
    parent.appendChild(this.capital);
    parent.appendChild(this.population);
  };

  this.renderName = function(parent){
    parent.appendChild(this.name);
  };
};

var CountriesList = function(countries){
  this.countries = countries;
  this.renderSelect = function(parent){
    var select = document.createElement('select');
    select.id = 'countries-select';
    select.setAttribute('placeholder', 'choose one');
    parent.appendChild(select);

    for (country of this.countries) {
      var option = document.createElement('option');
      option.value = JSON.stringify(country);
      option.text = country.name;
      select.appendChild(option);
    }
  };
  this.borderingCountries = function(country){
    return this.countries.reduce(function(arr, entry){
      if(country.borders.includes(entry.alpha3Code))
        arr.push(entry);
      return arr;
    }, []);
  };

};

var LocalCountriesList = function(key){
  this.key = key;
  this.getCountries = function(){
    return JSON.parse(localStorage.getItem(this.key)) || [];
  };
  this.hasCountry = function(country){
    return this.getCountries().map(function(entry){
      return entry.name;
    }).includes(country.name);
  };
  this.addCountry = function(country){
    var countries = this.getCountries();
    if(!this.hasCountry(country)){
      countries.push(country);
      localStorage.setItem(this.key, JSON.stringify(countries));
    }
  };
};


var doStuff = function(countries){
  console.log('got the data');
  console.log(countries[0].name);

  var list = new CountriesList(countries);

  var form = document.getElementById('countries-form');
  list.renderSelect(form);
  var button = document.createElement('input');
  button.id = 'countries-submit';
  button.type = 'button';
  button.value = 'Go';
  form.appendChild(button);

  button.onclick = function(){
    var country = JSON.parse(document.getElementById('countries-select').value);

    var view = new CountryView(country);
    var div = document.getElementById('country-div');
    while(div.firstChild){
      div.removeChild(div.firstChild);
    }
    view.render(div);

    var localList = new LocalCountriesList('countryAppList');
    localList.addCountry(country);

    
    // Find bordering countries
    if (country.borders.length > 0) {

      var borderingCountries = list.borderingCountries(country);

      var div = document.getElementById('country-div');
      var border = document.createElement('h3');
      border.innerText = 'Bordering Countries:';
      div.appendChild(border);

      for (country of borderingCountries) {
        var view = new CountryView(country);
        view.renderName(div);
      }
    }


  }
  

  }

  window.onload = function(){
    console.log('App started');

    var url = 'https://restcountries.eu/rest/v1/all';
    var request = new XMLHttpRequest();

    request.open('GET', url);
    request.onload = function(){
      if(request.status === 200){
        doStuff(JSON.parse(request.responseText));
      }
    };

    request.send(null);

  };



// EXTRA STUFF

// var b = data.reduce(function(col, country){
//   if(country.name[0].toUpperCase() === 'B'){
//     col.push(country.name);
//   }
//   return col;
// }, []);

// console.log(b);

// var english = data.reduce(function(col, country){
//   if(country.languages.includes('en')){
//     col.push(country.name);
//   }
//   return col;
// }, []);

// var mostBordering = data.reduce(function(most, country){
//   if(country.borders.length > most.borders.length){
//     most = country;
//   }
//   return most;
// }, data[0]);

// var greatestPop = data.reduce(function(result, country){
//   if(country.population > result.population){
//     result = country;
//   }
//   return result;
// }, data[0]);

// var monaco = data.find(function(country){
//   return country.name === 'Monaco';
// });

// console.log(mostBordering.name, 'has the most borders:', mostBordering.borders);
// console.log(greatestPop.name, 'has the greatest population:', greatestPop.population);


