var express = require('express');
var router = express.Router();


function mongoRouter(mongodb) {

  var database = require('./database')(mongodb);
  var middleware = require('./middleware')(database);


  router.get('/', middleware.getDB);

  return router;
}

module.exports = mongoRouter;