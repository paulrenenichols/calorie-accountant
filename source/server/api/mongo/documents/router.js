var express = require('express');
var router = express.Router();


function mongoDocumentsRouter(mongodb) {

  var database = require('./database')(mongodb);
  var api = require('./api')(database);
  var middleware = require('./middleware')(api);

  router.get('/:collection/documents', middleware.getDocuments);
  router.get('/:collection/documents/:id', middleware.getDocuments);

  router.post('/:collection/documents', middleware.addDocument);

  router.put('/:collection/documents', middleware.updateDocument);
  router.put('/:collection/documents/:id', middleware.updateDocument);

  router.delete('/:collection/documents', middleware.removeDocument);
  router.delete('/:collection/documents/:id', middleware.removeDocument);

  return router;
}

module.exports = mongoDocumentsRouter;