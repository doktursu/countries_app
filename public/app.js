// var CountryView = function(country){
//   this.country = country;

//   this.name = document.createElement('h2');
//   this.name.innerText = country.name;
  
//   this.capital = document.createElement('p');
//   this.capital.innerText = 'Capital: ' + country.capital;
  
//   this.population = document.createElement('p');
//   this.population.innerText = 'Population: ' + country.population;

//   this.render = function(parent){
//     parent.appendChild(this.name);
//     parent.appendChild(this.capital);
//     parent.appendChild(this.population);
//   };

//   this.renderName = function(parent){
//     parent.appendChild(this.name);
//   };

//   this.renderTableRow = function(parent, attrs){
//     var tr = document.createElement('tr');
//     for(prop in this.country){
//       if(attrs.includes(prop)){
//         var td = document.createElement('td');
//         td.innerText = country[prop];
//         tr.appendChild(td);
//       }
//     }
//     parent.appendChild(tr);
//   };
//   this.setMap = function(){
//     console.log(this.country);
//     var centre = {lat: this.country.latlng[0], lng: this.country.latlng[1]};
//     new Map(centre);
//   };
// };

// CountryView.renderTableRowTh = function(parent, attrs){
//   var tr = document.createElement('tr');
//   attrs.forEach(function(prop){
//     var th = document.createElement('th');
//     th.innerText = prop;
//     tr.appendChild(th);
//   });
//   parent.appendChild(tr);
// };

// var removeChildren = function(parent){
//   while(parent.firstChild){
//     parent.removeChild(parent.firstChild);
//   }
// };

// // var CountriesList = function(countries){
// //   this.countries = countries;

// //   this.renderSelect = function(countries){
// //     var countries = countries || this.countries;
// //     var select = document.getElementById('countries-select');
// //     removeChildren(select);

// //     for (country of countries) {
// //       var option = document.createElement('option');
// //       option.value = JSON.stringify(country);
// //       option.text = country.name;
// //       select.appendChild(option);
// //     }
// //   };
// //   this.bordering = function(country){
// //     return this.countries.reduce(function(arr, entry){
// //       if(country.borders.includes(entry.alpha3Code))
// //         arr.push(entry);
// //       return arr;
// //     }, []);
// //   };

// //   this.filter = function(prop, value){
// //     if(value != false) {
// //       return this.countries.reduce(function(arr, country){
// //         if(country[prop].includes(value)){
// //           arr.push(country);
// //         }
// //         return arr;
// //       }, []);
// //     }else{
// //       return this.countries.reduce(function(arr, country){
// //         if(country[prop] == false){
// //           arr.push(country);
// //         }
// //         return arr;
// //       }, []);
// //     }
// //   };

// //   this.unique = function(prop){
// //     var results =  this.countries.reduce(function(arr, country){
// //       if(!arr.includes(country[prop]))
// //         arr.push(country[prop]);
// //       return arr;
// //     }, []);
// //     return results;
// //   };

// // };

// var LocalCountriesList = function(key){
//   this.key = key;
//   this.getCountries = function(){
//     return JSON.parse(localStorage.getItem(this.key)) || [];
//   };
//   this.hasCountry = function(country){
//     return this.getCountries().map(function(entry){
//       return entry.name;
//     }).includes(country.name);
//   };
//   this.addCountry = function(country){
//     var countries = this.getCountries();
//     if(!this.hasCountry(country)){
//       countries.push(country);
//       localStorage.setItem(this.key, JSON.stringify(countries));
//     }
//   };
// };


// var doStuff = function(countries){

//   var countries = new CountriesList(countries);

//   // Filter Test
//   console.log(countries.filter('region', 'Asia'));
//   console.log(countries.unique('region'));
//   //Create options for select
//   var regions = countries.unique('region');
//   var regionSelect = document.getElementById('region-select');
//   for(region of regions){
//     var option = document.createElement('option');
//     option.value = region;
//     option.text = region ? region : 'Other';
//     regionSelect.appendChild(option);
//   }

//   regionSelect.onchange = function(){
//     var region = document.getElementById('region-select').value;
//     countries.renderSelect(countries.filter('region', region));
//   };


//   var table = document.getElementById('countries-table');
//   var props = ['name', 'capital', 'population'];

//   var tableView = new CountriesTableView(table);
//   tableView.display(countries.countries, props);

//   countries.renderSelect();
//   // var button = document.createElement('input');
//   // button.id = 'countries-submit';
//   // button.type = 'button';
//   // button.value = 'Go';
//   // form.appendChild(button);

//   var select = document.getElementById('countries-select');
//   select.onchange = function(){
//     var myCountry = JSON.parse(document.getElementById('countries-select').value);

//     var view = new CountryView(myCountry);

//     view.setMap();

//     var parent = document.getElementById('country-div');
//     while(parent.firstChild){
//       parent.removeChild(parent.firstChild);
//     }
//     view.render(parent);

//     var localList = new LocalCountriesList('countryAppList');
//     localList.addCountry(myCountry);

    
//     // Render bordering countries
//     if (myCountry.borders.length > 0) {

//       var borderingCountries = countries.bordering(myCountry);

//       var border = document.createElement('h3');
//       border.innerText = 'Bordering Countries:';
//       parent.appendChild(border);

//       for (country of borderingCountries) {
//         var view = new CountryView(country);
//         view.renderName(parent);
//       }
//     }
//   };

//   var filter = document.getElementById('filter-submit');
//   filter.onclick = function(){
//     var value = document.getElementById('filter-attr').value;

//     var table = document.getElementById('countries-table');
//     while(table.firstChild){
//       table.removeChild(table.firstChild);
//     }
//     // countries.renderList(table);
//     var attrs = ['name', 'languages'];
//     var table = document.getElementById('countries-table');
//     var props = ['name', 'capital', 'population'];

//     var tableView = new CountriesTableView(table);
//     tableView.display(countries.countries, props);
//     CountryView.renderTableRowTh(table, attrs);

//     console.log(countries);
//     countries.filter('languages', value).forEach(function(country){
//       var view = new CountryView(country);
//       view.renderTableRow(table, attrs);
//     });
//   };
// };

window.onload = function(){
  //setup views
  var regionsSelectView = new RegionsSelectView(document.querySelector('#regions-select'));
  var countriesSelectView = new CountriesSelectView(document.querySelector('#countries-select'));
  var countryDetailedView = new CountryDetailedView(document.querySelector('#country-detailed'));
  var countriesTableView = new CountriesTableView(document.querySelector('#countries-table'));
  var centre = {lat: 40.712784, lng: -74.005941};
  var map = new Map(centre);
  var geoLocator = new GeoLocator(map);
  geoLocator.onClick = function(){
    this.setMapCentre();
  }
  geoLocator.setMapCentre();

  var visited = new CountryCount();

  function updateCurrentCountry(country){
    countryDetailedView.display(country);
    var centre = {lat: country.latlng[0], lng: country.latlng[1]};
    map.setCentre(centre);
    map.addInfoWindow(centre, country);
    if(country.borders.length > 0){
      var bordering = world.bordering(country);
      countryDetailedView.displayBordering(bordering);
    }
    visited.update(country);
  }

  regionsSelectView.onChange = function(region){
    var countries = world.filter('region', region);
    countriesSelectView.populate(countries);
  };

  countryDetailedView.onClick = function(country){
    updateCurrentCountry(country);
  };
  countriesSelectView.onChange = function(country){
    updateCurrentCountry(country);
  };

  google.maps.event.addListener(map.googleMap, 'click', function(e){
    var lat = e.latLng.lat();
    var lng = e.latLng.lng();
    var position = [lat, lng];
    var nearestCountry = world.nearestCountry(position);
    console.log('nearest', nearestCountry);
    updateCurrentCountry(nearestCountry);
  });


  var world = new CountriesList();

  world.onUpdate = function(countries){
    var regions = world.unique('region');
    regionsSelectView.populate(regions);

    countriesSelectView.populate(countries);

    var props = ['name', 'capital', 'population'];
    countriesTableView.display(countries, props);
  };

  world.populate();


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


