var Q = require('q');

function database(mongodb){

  var db = {};

  function addCollection(name, callback) {
    
    var deferred = Q.defer();

    db.createCollection(name, {}, function(err, collection) {
      if (err) {
        console.log('db collections', 'error', err);
        deferred.reject(err);
      }
      else {
        console.log('db collections', 'success');
        deferred.resolve(collection);
      }
    });
  }

  function removeCollection(name, callback){

    var deferred = Q.defer();

    db.dropCollection(name, {}, function(err, result){
      if (err) {
        console.log('db collections', 'error', err);
        deferred.reject(err);
      }
      else {
        console.log('db collections', 'success');
        deferred.resolve(result);
      }
    });
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
    
  }

  db.addCollection = addCollection;
  db.getCollections = getCollections;
  db.removeCollection = removeCollection;

  return db;
}

module.exports = database;