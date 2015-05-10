
var express = require('express');
var router = express.Router();



function mongoRouter(mongodb) {

  var mongoDatabasesRouter = require('./mongo/databases/router')(mongodb);
  var mongoCollectionRouter = require('./mongo/collections/router')(mongodb);
  var database = require('./database')(mongodb);
  var middleware = require('./middleware')(database);


  router.get('/', mongoDatabasesRouter.getCollections);
  router.get('/', mongoDatabasesRouter.addCollection);
  router.get('/', mongoDatabasesRouter.removeCollection);


  return router;
}

module.exports = router;
