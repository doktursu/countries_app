var CountryCount = function(){
  this.countryCount = document.querySelector('#country-count');
  this.peopleCount = document.querySelector('#people-count');
  this.visited = [];
};

CountryCount.prototype = {
  update: function(country){
    if(!this.visited.includes(country.name)){
      this.visited.push(country.name);
      this.countryCount.innerText = this.visited.length;
      var num = parseInt(this.peopleCount.innerText) + country.population;
      this.peopleCount.innerText = num;
      switch(this.visited.length){
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
    }
  }
};