var express = require('express');
var router = express.Router();


function mongoCollectionRouter(mongodb) {

  var database = require('./database')(mongodb);
  var middleware = require('./middleware')(database);


  router.get('/', middleware.getCollections);

  router.post('/', middleware.addCollection);

  router.delete('/', middleware.removeCollection);

  return router;
}

module.exports = mongoCollectionRouter;