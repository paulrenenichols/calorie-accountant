angular.module('calorieAccountant', []) // Defines the application (no dependencies injected)
  .factory('calorieService', [function () {
    var service = {};
    var items = [];

    function getItems() {
      return items;
    }

    function addItem(item) {
      items.unshift(item);
    }


    service.getItems = getItems;
    service.addItem = addItem;
    return service;
  }])
  .controller('indexCtrl', ['calorieService', function (calorieService) {  // Defines indexCtrl that watches the DOM
    var self = this; // save this as a value to make it easier to keep track of

    self.items = [];  // initialize the items array
    var defaultItem = {  // Define the default item object. This is a template for all user entries 
      userID: 1,
      type: 'caloriesConsumed',
      value: 0
    };
    self.newItem = angular.copy(defaultItem);  // make an instance of default item

    self.types = [
      { 
        id: 1,
        label: 'Calories Consumed' 
      },
      { 
        id: 2,
        label: 'Calories Spent' 
      },
      { 
        id: 3,
        label: 'Weight'
      }
    ];
    
    this.addNewItem = function() {  // addNewItem function
        calorieService.addItem(self.newItem);
        self.items = calorieService.getItems();
        self.newItem = angular.copy(defaultItem);  // create a new copy of the default item to store this data
    };
  }]);