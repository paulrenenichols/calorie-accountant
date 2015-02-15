angular.module('calorieAccountant', [])
  .controller('indexCtrl', [function () {
    var self = this;

    self.items = [];
    var defaultItem = {
      userID: 1,
      type: 'caloriesConsumed',
      value: 0
    };
    self.newItem = angular.copy(defaultItem); 

    self.types = ['caloriesConsumed', 'caloriesSpent', 'weight'];
    
    this.addNewItem = function() {
      if (self.newItem !== "") {
        self.items.unshift(self.newItem);
        self.newItem = angular.copy(defaultItem); 
      }
    };
  }]);