var express = require('express');
var router = express.Router();


function mongoCollectionRouter(mongodb) {

  var database = require('./database')(mongodb);
  var middleware = require('./middleware')(database);

  router.get('/:collection/documents', middleware.getDocuments);

  router.post('/:collection/documents/:id', middleware.addDocument);

  router.delete('/:collection/documents/:id', middleware.removeDocument);

  return router;
}

module.exports = mongoCollectionRouter;