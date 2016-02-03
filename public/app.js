var CountryView = function(country){
  this.country = country;

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

  this.renderTableRow = function(parent, attrs){
    var tr = document.createElement('tr');
    for(prop in this.country){
      if(attrs.includes(prop)){
        var td = document.createElement('td');
        td.innerText = country[prop];
        tr.appendChild(td);
      }
    }
    parent.appendChild(tr);
  };
};

CountryView.renderTableRowTh = function(parent, attrs){
  var tr = document.createElement('tr');
  attrs.forEach(function(prop){
    var th = document.createElement('th');
    th.innerText = prop;
    tr.appendChild(th);
  });
  parent.appendChild(tr);
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
  this.bordering = function(country){
    return this.countries.reduce(function(arr, entry){
      if(country.borders.includes(entry.alpha3Code))
        arr.push(entry);
      return arr;
    }, []);
  };

  this.filter = function(attr, value){
    return this.countries.reduce(function(arr, country){
      if(country[attr].includes(value)){
        arr.push(country);
      }
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

  var countries = new CountriesList(countries);

  var table = document.getElementById('countries-table');
  // countries.renderList(table);
  var attrs = ['name', 'population', 'capital'];
  CountryView.renderTableRowTh(table, attrs);
  countries.countries.forEach(function(country){
    var view = new CountryView(country);
    view.renderTableRow(table, attrs);
  });

  var form = document.getElementById('countries-form');
  countries.renderSelect(form);
  var button = document.createElement('input');
  button.id = 'countries-submit';
  button.type = 'button';
  button.value = 'Go';
  form.appendChild(button);

  button.onclick = function(){
    var myCountry = JSON.parse(document.getElementById('countries-select').value);

    var view = new CountryView(myCountry);
    var parent = document.getElementById('country-div');
    while(parent.firstChild){
      parent.removeChild(parent.firstChild);
    }
    view.render(parent);

    var localList = new LocalCountriesList('countryAppList');
    localList.addCountry(myCountry);

    
    // Render bordering countries
    if (myCountry.borders.length > 0) {

      var borderingCountries = countries.bordering(myCountry);

      var border = document.createElement('h3');
      border.innerText = 'Bordering Countries:';
      parent.appendChild(border);

      for (country of borderingCountries) {
        var view = new CountryView(country);
        view.renderName(parent);
      }
    }
  };

  var filter = document.getElementById('filter-submit');
  filter.onclick = function(){
    var value = document.getElementById('filter-attr').value;

    var table = document.getElementById('countries-table');
    while(table.firstChild){
      table.removeChild(table.firstChild);
    }
    // countries.renderList(table);
    var attrs = ['name', 'languages'];
    CountryView.renderTableRowTh(table, attrs);

    console.log(countries);
    countries.filter('languages', value).forEach(function(country){
      var view = new CountryView(country);
      view.renderTableRow(table, attrs);
    });
  };
};

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


