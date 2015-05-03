 var Q = require('q');

function database(mongodb){

  var db = {};

  function addUser(user) {
    console.log('addUser', user);
    var collection = mongodb.collection('users');

    var deferred = Q.defer();

    collection.insert(user, function(err, result) {
      console.log('db addUser', 'error', err, 'result', result);
      if (err) {
        deferred.reject(err);
      }
      else {
        deferred.resolve(result);
      }
    });

    return deferred.promise;

//    return Q.ninvoke(collection, "insert", "user").done(function (result){
//    });
  }

  function getUser(userEmail, callback) {
    console.log('getUser');
    var collection = mongodb.collection('users');
    collection.findOne({
      email: userEmail
    }, callback);
  }

  db.addUser = addUser;
  db.getUser = getUser;

  return db;
}

module.exports = database;