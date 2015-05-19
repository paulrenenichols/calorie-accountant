var Q = require('q');
var _ = require('lodash');

function api(database){

  var apiObj = {};

  function getCollections(){

    console.log('api getCollections');

    return database.getCollections()
      .then(function(result) {
        var collectionList = _.map(result, function(value) { return { name: value.collectionName }; });
        console.log('api getCollections', JSON.stringify(collectionList, null, 2));
        return collectionList;
      });
  }

  apiObj.getCollections   = getCollections;
  apiObj.addCollection    = database.addCollection;
  apiObj.removeCollection = database.removeCollection;

  return apiObj;
}

module.exports = api;