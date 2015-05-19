var Q = require('q');


function middleware(api){

  var mw = {};

  function getCollections(req, res) {
    console.log('mw getCollections');
    api.getCollections()
      .then(
        function(result) {
          console.log('mw getCollections: ', 'success');
          res.status(200).json({
            developerMessage: "retrieved collections",
            collections: result
          });
        },
        function(reason) {
          console.log('mw getCollections: ', reason);
          res.status(500).json({
            developerMessage: 'unable to read collections',
            error: reason
          });
        }
      );
  }

  function addCollection(req, res) {
    console.log('mw addCollection', JSON.stringify(req.body, null, 2));

    // If the body of the request doesn't contain a collection property with a collection.name property, indicate an error to the requester
    if (!req.body || !req.body.collection || !req.body.collection.name) {
      res.status(400).json({
        developerMessage: "malformed create collection request.  collection object with name property not found in request body."
      });
      return;
    }

    api.addCollection(req.body.collection.name)
      .then(
        function(result) {
          console.log('mw addCollection: ', 'success');
          res.status(200).json({
            developerMessage: "created collection: " + req.body.collection.name
          });
        },
        function(reason) {
          console.log('mw addCollection: ', 'FAIL: ', reason);
          res.status(500).json({
            developerMessage: "unable to create collection '" + name + "'",
            error: reason 
          });
        }
      );

  }

  function removeCollection(req, res) {
    console.log('mw removeCollection');

    api.removeCollection(req.params.collection)
      .then(
        function(result) {
          console.log('mw removeCollection: ', 'success');
          res.status(200).json({
            developerMessage: "deleted collection '" + req.params.collection + "'",
            result: result
          });
        },
        function(reason) {
          console.log('mw removeCollection: ', 'FAIL: ', reason);
          res.status(500).json({
            developerMessage: "unable to delete collection '" + req.params.collection + "'",
            error: reason 
          });
        }
      );
  }

  mw.addCollection = addCollection;
  mw.getCollections = getCollections;
  mw.removeCollection = removeCollection;

  return mw;

}

module.exports = middleware;