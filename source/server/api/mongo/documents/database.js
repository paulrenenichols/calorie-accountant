var Q = require('q');

function database(mongodb){

  var db = {};

  function addDocument(collectionName, docID) {

    var deferred = Q.defer();

    mongodb.collection(collectionName, {}, function(err, collection) {
      if(err){
        console.log('db addDocument', 'error', err);
        deferred.reject(err);
      }
      else {
        collection.insertOne({id: docID}, {}, function (err, result){
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

  function getDocuments(collectionName){
    
    var deferred = Q.defer();

    mongodb.collection(collectionName, {}, function(err, collection) {
      if(err){
        console.log('db getDocuments', 'error', err, collectionName);
        deferred.reject(err);
      }
      else {
        collection.find().toArray( function (err, docs){
          if (err) {
            console.log('db getDocuments', 'error', err);
            deferred.reject(err);
          }
          else {
            console.log('db getDocuments', 'success');
            deferred.resolve(docs);
          }
        });
      }
    });

    return deferred.promise;
  }

  function removeDocument(collectionName, docID){
    var deferred = Q.defer();

    mongodb.collection(collectionName, {}, function(err, collection) {
      if(err){
        console.log('db removeDocument', 'error', err);
        deferred.reject(err);
      }
      else {
        collection.findOneAndDelete({"id": docID}, {}, function (err, result){
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

  return db;
}

module.exports = database;