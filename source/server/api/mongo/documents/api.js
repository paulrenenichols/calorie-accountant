var Q = require('q');
var _ = require('lodash');

function api(database){

  var apiObj = {};

  function getDocuments(collectionName, key, value){

    console.log('api getDocuments');

    return database.getDocuments(collectionName, key, value)
      .then(function(result) {
        console.log('api getDocuments', JSON.stringify(result, null, 2));
        return { documents: result };
      });
  }

  apiObj.getDocuments   = getDocuments;
  apiObj.addDocument    = database.addDocument;
  apiObj.updateDocument = database.updateDocument;
  apiObj.removeDocument = database.removeDocument;

  return apiObj;
}

module.exports = api;