var _ = require('lodash');


function middleware(api){

  var mw = {};

  function getDocuments(req, res) {
    console.log('mw getDocuments');

    var key = req.query.key;
    var value = req.query.value;
    if (req.params.id) {
      key = "_id";
      value =  req.params.id;
    }

    api.getDocuments(req.params.collection, key, value)
      .then (
        function(result) {
          console.log('mw getDocuments: ', 'success');
          result.developerMessage = "retrieved documents";
          res.status(200).json(result);
        },
        function(reason) {
          console.log('mw getDocuments: ', err);
          res.status(500).json({
            error: err, 
            developerMessage: 'mw getDocuments failure' 
          });
        }
      );
  }

  function addDocument(req, res) {
    console.log('mw addDocument');

    if (!req.body) {
      res.status(400).json({
        developerMessage: "malformed create document request."
      });
      return;
    }

    api.addDocument(req.params.collection, req.body)
      .then(
        function(result) {
          console.log('mw addDocument: ', 'success');
          res.status(200).json({
            developerMessage: "created document",
            result: result
          });
        },
        function(reason) {
          console.log('mw addDocument: ', 'FAIL: ', reason);
          res.status(500).json({
            error: reason, 
            developerMessage: 'addDocument failure' 
          });
        }
      );

  }

  function updateDocument(req, res){
    console.log('mw updateDocument');

    if (!req.body) {
      res.status(400).json({
        developerMessage: "malformed update document request."
      });
      return;
    }

    var key = req.query.key;
    var value = req.query.value;
    if (req.params.id) {
      key = "_id";
      value =  req.params.id;
    }

    api.updateDocument(req.params.collection, key, value, req.body)
      .then(
        function(result) {
          console.log('mw updateDocument: ', 'success');
          res.status(200).json({
            developerMessage: "document has been updated: ",
            result: result
          });
        },
        function(reason) {
          console.log('mw updateDocument: ', 'FAIL: ', reason);
          res.status(500).json({
            error: reason, 
            developerMessage: 'updateDocument failure' 
          });
        }
      );
  }

  function removeDocument(req, res) {
    console.log('mw removeDocument');

    var key = req.query.key;
    var value = req.query.value;
    if (req.params.id) {
      key = "_id";
      value =  req.params.id;
    }
    
    api.removeDocument(req.params.collection, req.query.key, req.query.value)
      .then(
        function(result) {
          console.log('mw removeDocument: ', 'success');
          res.status(200).json({
            developerMessage: "document has been removed: ",
            result: result
          });
        },
        function(reason) {
          console.log('mw removeDocument: ', 'FAIL: ', reason);
          res.status(500).json({
            error: reason, 
            developerMessage: 'removeDocument failure' 
          });
        }
      );
  }

  mw.getDocuments   = getDocuments;
  mw.addDocument    = addDocument;
  mw.updateDocument = updateDocument;
  mw.removeDocument = removeDocument;

  return mw;

}

module.exports = middleware;