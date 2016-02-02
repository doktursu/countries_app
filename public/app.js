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


var doStuff = function(countries){
  console.log('got the data');
  console.log(countries[0].name);

//form
  var form = document.getElementById('countries-form');

  var selectList = document.createElement('select');
  selectList.id = 'countries-select';
  form.appendChild(selectList);

  //form

  //options
  for (var i = 0; i < countries.length; i++) {
    var option = document.createElement('option');
    option.value = JSON.stringify(countries[i]);
    option.text = countries[i].name;
    selectList.appendChild(option);
  }
  //options

  //button
  var button = document.createElement('input');
  button.id = 'countries-submit';
  button.type = 'button';
  button.value = 'Go';
  form.appendChild(button);
  //button

  button.onclick = function(){
    var country = JSON.parse(document.getElementById('countries-select').value);

    var view = new CountryView(country);
    var div = document.getElementById('country-div');
    while(div.firstChild){
      div.removeChild(div.firstChild);
    }
    view.render(div);

    var countryAppList = JSON.parse(localStorage.getItem('countryAppList')) || [];

    if (!countryAppList.map(function(country){
      return country.name;
    }).includes(country.name)){
      countryAppList.push(country);
      localStorage.setItem('countryAppList', JSON.stringify(countryAppList));
    }
    // Find bordering countries
    var borders = country.borders;

    var borderingCountries = [];

    for (var i = 0; i < countries.length; i++) {
      if(borders.includes(countries[i].alpha3Code)){
        borderingCountries.push(countries[i]);
      }
    };

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


