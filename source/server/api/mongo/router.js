
var express = require('express');
var router = express.Router();



function mongoRouter(mongodb) {

  var mongoDatabasesRouter = require('./databases/router')(mongodb);
  var mongoCollectionRouter = require('./collections/router')(mongodb);


  router.use('/databases', mongoDatabasesRouter);
  router.use('/collections', mongoCollectionRouter);

  return router;
}

module.exports = mongoRouter;
