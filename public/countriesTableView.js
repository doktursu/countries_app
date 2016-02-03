var CountriesTableView = function(tableElement){
  this.tableElement = tableElement;
}

CountriesTableView.prototype = {
  display: function(countries, props){
    this.tableElement.appendChild(this.tableRowTh(props));
    for(country of countries){
      this.tableElement.appendChild(this.tableRowTd(country, props));
    }
  },
  tableRowTh: function(props){
    var tr = document.createElement('tr');
    props.forEach(function(prop){
      var th = document.createElement('th');
      th.innerText = prop[0].toUpperCase() + prop.slice(1);
      tr.appendChild(th);
    });
    return tr;
  },
  tableRowTd: function(country, props){
    var tr = document.createElement('tr');
    for(prop in country){
      if(props.includes(prop)){
        var td = document.createElement('td');
        td.innerText = country[prop];
        tr.appendChild(td);
      }
    }
    return tr;
  }
};