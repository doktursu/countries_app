var CountriesFilterView = function(filterElement){
  this.filterElement = filterElement;
  this.onChange = undefined;
};

CountriesFilterView.prototype = {

};

// var filter = document.getElementById('filter-submit');
// filter.onclick = function(){
//   var value = document.getElementById('filter-attr').value;

//   var table = document.getElementById('countries-table');
//   while(table.firstChild){
//     table.removeChild(table.firstChild);
//   }
//   // countries.renderList(table);
//   var attrs = ['name', 'languages'];
//   var table = document.getElementById('countries-table');
//   var props = ['name', 'capital', 'population'];

//   var tableView = new countriesTableView(table);
//   tableView.display(countries.countries, props);
//   CountryView.renderTableRowTh(table, attrs);

//   console.log(countries);
//   countries.filter('languages', value).forEach(function(country){
//     var view = new CountryView(country);
//     view.renderTableRow(table, attrs);
//   });
// };
