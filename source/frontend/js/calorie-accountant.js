angular.module('calorieAccountant', ['ui.router']) // Defines the application (no dependencies injected)
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('home', {
      url: '/',
      templateUrl: 'templates/home.html',
      controller: 'indexCtrl as ctrl'

    });
    $stateProvider.state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl as ctrl'

    });

  }])
  .run(['$state', function($state) {
    $state.go('home');
  }])
  .factory('calorieService', ['$http', function ($http) {
    var service = {};

    var url = "http://localhost:3000/api/";

    function getItems() {
      return $http.get(url + 'get-items');
    }

    function addItem(item) {
      var req = {
        method: 'POST',
        url: url + 'add-item',
        data: item
      };

      return $http(req);
    }


    service.getItems = getItems;
    service.addItem = addItem;
    return service;
  }])
  .controller('loginCtrl', ['calorieService', function (calorieService) {
    var self = this;
    console.log('login');
    this.Login = function() { 
      var email = self.email;
      var password = self.password;
      console.log('your password is: ');
      console.log(self.password);
    };
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


    var getItemsPromise = calorieService.getItems();
    getItemsPromise.then(function (response) {
      self.items = response.data;
    });

    this.addNewItem = function() {  // addNewItem function
        var addItemPromise = calorieService.addItem(self.newItem);
        var getItemsPromise = addItemPromise.then(function (response) {
          return calorieService.getItems();
        })
        .catch(function (reason) {
          console.log('addItem failed bc: ', reason);
        });

        getItemsPromise.then(function (response) {
          self.items = response.data;
          self.newItem = angular.copy(defaultItem);  // create a new copy of the default item to store this data
        });
    };
  }]);