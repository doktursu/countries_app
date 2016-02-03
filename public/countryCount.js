var CountryCount = function(){
  this.element = document.querySelector('#country-count');
  this.visited = [];
};

CountryCount.prototype = {
  update: function(country){
    if(!this.visited.includes(country.name)){
      this.visited.push(country.name);
      this.element.innerText = this.visited.length;
    }
  }
};