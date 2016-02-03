var RegionsSelectView = function(selectElement){
  this.selectElement = selectElement;
  this.onChange = undefined;
  this.selectElement.addEventListener('change', function(e){
    var region = e.target.value;
    this.onChange(region);
  }.bind(this));
};

RegionsSelectView.prototype = {
  populate: function(regions){
    this.selectElement.innerHTML = '';
    for(region of regions){
      var option = document.createElement('option');
      option.value = region;
      option.text = region ? region : 'Other';
      this.selectElement.appendChild(option);
    }
  }
};