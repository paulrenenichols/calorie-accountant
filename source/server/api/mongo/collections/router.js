var express = require('express');
var router = express.Router();


function mongoCollectionRouter(mongodb) {

  var database    = require('./database')(mongodb);
  var api         = require('./api')(database);
  var middleware  = require('./middleware')(api);


  router.get('/', middleware.getCollections);

  router.post('/', middleware.addCollection);

  router.delete('/:collection', middleware.removeCollection);

  return router;
}

module.exports = mongoCollectionRouter;