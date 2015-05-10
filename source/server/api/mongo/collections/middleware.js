var _ = require('lodash');


function middleware(db){

  var mw = {};

  function getCollections(req, res) {
    console.log('mw getCollections');
    db.getCollections()
      .then (
        function(result) {
          console.log('mw getCollections: ', 'success');
          var collectionNames = _.map(result, function(value) { return value.collectionName; });
          res.status(200).json(collectionNames);
        },
        function(reason) {
          console.log('mw getCollections: ', err);
          res.status(500).json({
            error: err, 
            message: 'mw getCollections failure' 
          });
        }
      );
  }

  function addCollection(req, res) {
    console.log('mw addCollection');
    db.addCollection(req.params.collection)
      .then(
        function(result) {
          console.log('mw addCollection: ', 'success');
          res.status(200).json({
            message: "created collection: " + result.collectionName
          });
        },
        function(reason) {
          console.log('mw addCollection: ', 'FAIL: ', reason);
          res.status(500).json({
            error: reason, 
            message: 'addCollection failure' 
          });
        }
      );

  }

  function removeCollection(req, res) {
    console.log('mw removeCollection');
    db.removeCollection(req.params.collection)
      .then(
        function(result) {
          console.log('mw removeCollection: ', 'success');
          res.status(200).json({
            message: "killed collection (only its documents weep for its passage):" + result
          });
        },
        function(reason) {
          console.log('mw removeCollection: ', 'FAIL: ', reason);
          res.status(500).json({
            error: reason, 
            message: 'removeCollection failure' 
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