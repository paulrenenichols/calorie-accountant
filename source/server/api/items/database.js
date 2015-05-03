var Q = require('q');

function database(mongodb){

  var db = {};

  function addItem(item) {
    console.log('db addItem', item);
    var collection = mongodb.collection('items');

    var deferred = Q.defer();

    collection.insert(item, function(err, result) {
      console.log('db addItem', 'error', err, 'result', result);
      if (err) {
        deferred.reject(err);
      }
      else {
        deferred.resolve(result);
      }
    });

    return deferred.promise;
  }

  function getItems() {
    console.log('db getItems');
    var collection = mongodb.collection('items');

    var deferred = Q.defer();

    collection.find().toArray(function(err, result) {
      console.log('db getItems', 'error', err, 'result', result);
      if (err) {
        console.log('db getItems', 'reject');
        deferred.reject(err);
      }
      else {
        console.log('db getItems', 'fulfilled');
        deferred.resolve(result);
      }
    });

    return deferred.promise;
  }

  db.addItem = addItem;
  db.getItems = getItems;

  return db;
}

module.exports = database;