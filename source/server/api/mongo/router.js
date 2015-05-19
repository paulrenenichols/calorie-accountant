
var express = require('express');
var router = express.Router();



function mongoRouter(mongodb) {

  var mongoCollectionRouter = require('./collections/router')(mongodb);
  var mongoDocumentsRouter = require('./documents/router')(mongodb);

  router.use('/collections/', mongoCollectionRouter);
  router.use('/collections/', mongoDocumentsRouter);

  return router;
}

module.exports = mongoRouter;
