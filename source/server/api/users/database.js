 var Q = require('q');

function database(mongodb){

  var db = {};

  function addUser(user) {
    console.log('addUser', user);
    var collection = mongodb.collection('users');

    var deferred = Q.defer();

    collection.insert(user, function(err, result) {
      if (err) {
        console.log('db addUser', 'error', err);
        deferred.reject(err);
      }
      else {
        console.log('db addUser', 'success');
        deferred.resolve(result);
      }
    });

    return deferred.promise;
  }

  function getUser(userEmail) {
    console.log('getUser');
    var collection = mongodb.collection('users');

    var deferred = Q.defer();

    collection.findOne(
      {
        email: userEmail
      }, 
      function (err, result){
        if(err){
          console.log('db getUser', 'error', err);
          deferred.reject(err);
        }
        else {
          console.log('db getUser', 'success');
          deferred.resolve(result);
        }
      }
    );
    return deferred.promise;
  }

  db.addUser = addUser;
  db.getUser = getUser;

  return db;
}

module.exports = database;