var express = require('express');
var router = express.Router();


function mongoCollectionRouter(mongodb) {

  var database = require('./database')(mongodb);
  var middleware = require('./middleware')(database);

  router.get('/:collection', middleware.getDocuments);

  router.post('/:collection', middleware.addDocument);

  router.put('/:collection/', middleware.updateDocument);
  router.put('/:collection/:id', middleware.updateDocument);

  router.delete('/:collection/', middleware.removeDocument);
  router.delete('/:collection/:id', middleware.removeDocument);

  return router;
}

module.exports = mongoCollectionRouter;