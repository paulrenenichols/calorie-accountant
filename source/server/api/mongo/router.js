
var express = require('express');
var router = express.Router();



function mongoRouter(mongodb) {

  var mongoDatabasesRouter = require('./mongo/databases/router')(mongodb);
  var mongoCollectionRouter = require('./mongo/collections/router')(mongodb);


  router.use('/', mongoDatabasesRouter);
  router.use('/collections/:collection', mongoCollectionRouter);



  return router;
}

module.exports = router;
