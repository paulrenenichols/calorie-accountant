var Q = require('q');

function database(mongodb){

  var db = {};

  function addCollection(name) {
    
    var deferred = Q.defer();

    mongodb.createCollection(name, {}, function(err, collection) {
      if (err) {
        console.log('db collections', 'error', err);
        deferred.reject(err);
      }
      else {
        console.log('db collections', 'success');
        deferred.resolve(collection);
      }
    });
    return deferred.promise;
  }

  function removeCollection(name){

    var deferred = Q.defer();

    console.log('db remove collections', name);

    mongodb.dropCollection(name, function(err, result){
      if (err) {
        console.log('db remove collections', 'error', err);
        deferred.reject(err);
      }
      else {
        console.log('db remove collections', 'success', result);
        deferred.resolve(result);
      }
    });
    return deferred.promise;
  }


  function getCollections(){

    var deferred = Q.defer();
    // Use the admin database for the operation
    mongodb.collections(function(err, collections) {
      if (err) {
        console.log('db collections', 'error', err);
        deferred.reject(err);
      }
      else {
        console.log('db collections', 'success');
        deferred.resolve(collections);
      }
    });
    return deferred.promise;
  }

  db.addCollection = addCollection;
  db.getCollections = getCollections;
  db.removeCollection = removeCollection;

  return db;
}

module.exports = database;