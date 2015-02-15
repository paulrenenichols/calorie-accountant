angular.module('calorieAccountant', [])
  .controller('indexCtrl', [function () {
    var self = this;

    self.items = [];
    self.newItem = '';
    
    this.addNewItem = function() {
      if (self.newItem !== "") {
        self.items.unshift(self.newItem);
        self.newItem = "";
      }
    };
  }]);