angular.module('calorieAccountant', ['ui.router']) // Defines the application (no dependencies injected)
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'templates/home.html',
        controller: 'indexCtrl as ctrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl as ctrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'templates/signup.html',
        controller: 'signupCtrl as ctrl'
      });


  }])
  .run(['$state', function($state) {
    $state.go('login');
  }])
  .factory('calorieService', ['$http', function ($http) {
    var service = {};

    var url = "http://localhost:3000/api/items";

    function getItems() {
      return $http.get(url);
    }

    function addItem(item) {
      var req = {
        method: 'POST',
        url: url,
        data: item
      };

      return $http(req);
    }


    service.getItems = getItems;
    service.addItem = addItem;
    return service;
  }])
  .factory('usersService', ['$http', function ($http) {
    var service = {};

    var url = "http://localhost:3000/api/users";

    function signup(user) {
      var req = {
        method: 'POST',
        url: url + '/signup',
        data: user
      };

      return $http(req);
    }

    function auth(user) {
      var req = {
        method: 'POST',
        url: url + '/auth',
        data: user
      };

      return $http(req);
    }

    service.signup = signup;
    service.auth = auth;

    return service;
  }])
  .controller('loginCtrl', ['usersService', '$state', function (usersService, $state) {
    var self = this;
    console.log('login');

    self.user = {
      email: "",
      password: ""
    };

    this.Login = function() { 

      console.log('user', JSON.stringify(self.user, null, 2));

      usersService.auth(self.user).then(
        function(res) {
          if (res.status === 200) {
            $state.go('home');
          }
          else if (res.status === 500) {
            console.log('bad login, oops');
          }
        }, 
        function(reason) {
          console.log('auth request fail');
        }
      );
    };
  }])
  .controller('signupCtrl', ['usersService', '$state', function (usersService, $state) {
    var self = this;
    console.log('signup');

    self.user = {
      email: "",
      password: ""
    };

    this.signup = function() { 

      usersService.signup(self.user).then(
        function(res) {
          if (res.status === 200) {
            $state.go('login');
          }
          else if (res.status === 500) {
            console.log('bad signup, oops');
          }
        }, 
        function(reason) {
          console.log('signup request fail');
        }
      );
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