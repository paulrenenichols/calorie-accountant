var _ = require('lodash');


function middleware(db){

  var mw = {};

  function getDocuments(req, res) {
    console.log('mw getDocuments');
    db.getDocuments(req.params.collection, req.params.key, req.params.value)
      .then (
        function(result) {
          console.log('mw getDocuments: ', 'success');
//          var documentNames = _.map(result, function(value) { return value.email; });
          res.status(200).json(result);
        },
        function(reason) {
          console.log('mw getDocuments: ', err);
          res.status(500).json({
            error: err, 
            message: 'mw getDocuments failure' 
          });
        }
      );
  }

  function updateDocument(req, res){
    console.log('mw updateDocument');
    db.updateDocument(req.params.collection, req.params.key, req.params.value, req.body)
      .then(
        function(result) {
          console.log('mw updateDocument: ', 'success');
          res.status(200).json({
            message: "document has been updated: " + result
          });
        },
        function(reason) {
          console.log('mw updateDocument: ', 'FAIL: ', reason);
          res.status(500).json({
            error: reason, 
            message: 'updateDocument failure' 
          });
        }
      );
  }

  function addDocument(req, res) {
    console.log('mw addDocument');
    db.addDocument(req.params.collection, req.body)
      .then(
        function(result) {
          console.log('mw addDocument: ', 'success');
          res.status(200).json({
            message: "created document",
            document: result
          });
        },
        function(reason) {
          console.log('mw addDocument: ', 'FAIL: ', reason);
          res.status(500).json({
            error: reason, 
            message: 'addDocument failure' 
          });
        }
      );

  }

  function removeDocument(req, res) {
    console.log('mw removeDocument');
    db.removeDocument(req.params.collection, req.params.key, req.params.value)
      .then(
        function(result) {
          console.log('mw removeDocument: ', 'success');
          res.status(200).json({
            message: "document has been removed: " + result
          });
        },
        function(reason) {
          console.log('mw removeDocument: ', 'FAIL: ', reason);
          res.status(500).json({
            error: reason, 
            message: 'removeDocument failure' 
          });
        }
      );
  }

  mw.addDocument = addDocument;
  mw.getDocuments = getDocuments;
  mw.removeDocument = removeDocument;
  mw.updateDocument = updateDocument;

  return mw;

}

module.exports = middleware;