var express = require('express');
var router = express.Router();


function mongoCollectionRouter(mongodb) {

  var database = require('./database')(mongodb);
  var middleware = require('./middleware')(database);

  router.get('/:collection/documents/', middleware.getDocuments);

  router.get('/:collection/documents/:key/:value', middleware.getDocuments);

  router.post('/:collection/documents/', middleware.addDocument);

  router.put('/:collection/documents/:key/:value', middleware.updateDocument);

  router.delete('/:collection/documents/:key/:value', middleware.removeDocument);

  return router;
}

module.exports = mongoCollectionRouter;