var Q = require('q');
var ObjectID = require('mongodb').ObjectID;

function database(mongodb){

  var db = {};

  function addDocument(collectionName, document) {

    var deferred = Q.defer();

    mongodb.collection(collectionName, {}, function(err, collection) {
      if(err){
        console.log('db addDocument', 'error', err);
        deferred.reject(err);
      }
      else {
        collection.insertOne(document, {}, function (err, result){
          if (err) {
            console.log('db addDocument', 'error', err);
            deferred.reject(err);
          }
          else {
            console.log('db addDocument', 'success');
            deferred.resolve(result);
          }
        });
      }
    });

    return deferred.promise;
  }

  function buildSearchObject(key, value) {
    var searchObject = {};

    if(key && value){
      if(key === "_id") {
        value = ObjectID.createFromHexString(value);
      }
      searchObject[key] = value;
    }

    return searchObject;
  }

  function getDocuments(collectionName, key, value){
    
    var deferred = Q.defer();

    var searchObject = buildSearchObject(key, value);

    mongodb.collection(collectionName, {}, function(err, collection) {
      if(err){
        console.log('db getDocuments', 'error', err, collectionName);
        deferred.reject(err);
      }
      else {

        collection.find(searchObject).toArray( function (err, docs){
          if (err) {
            console.log('db getDocuments', 'error', err);
            deferred.reject(err);
          }
          else {
            console.log('db getDocuments', 'success', searchObject);
            deferred.resolve(docs);
          }
        });
      }
    });

    return deferred.promise;
  }

  function updateDocument(collectionName, key, value, document){
    var deferred = Q.defer();

    var searchObject = buildSearchObject(key, value);

    console.log('db updateDocument', 'document: ', document);

    mongodb.collection(collectionName, {}, function(err, collection) {
      if(err){
        console.log('db updateDocument', 'error', err);
        deferred.reject(err);
      }
      else {
        collection.findOneAndUpdate(searchObject, document, {}, function (err, result){
          if (err) {
            console.log('db updateDocument', 'error', err);
            deferred.reject(err);
          }
          else {
            console.log('db updateDocument', 'success', result);
            deferred.resolve(result);
          }
        });
      }
    });
    return deferred.promise;
  }

  function removeDocument(collectionName, key, value){
    var deferred = Q.defer();

    var searchObject = buildSearchObject(key, value);

    mongodb.collection(collectionName, {}, function(err, collection) {
      if(err){
        console.log('db removeDocument', 'error', err);
        deferred.reject(err);
      }
      else {
        collection.findOneAndDelete(searchObject, {}, function (err, result){
          if (err) {
            console.log('db removeDocument', 'error', err);
            deferred.reject(err);
          }
          else {
            console.log('db removeDocument', 'success');
            deferred.resolve(result);
          }
        });
      }
    });
    return deferred.promise;
  }

  db.getDocuments = getDocuments;
  db.addDocument = addDocument;
  db.removeDocument = removeDocument;
  db.updateDocument = updateDocument;

  return db;
}

module.exports = database;