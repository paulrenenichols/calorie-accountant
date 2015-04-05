var express = require('express');
var router = express.Router();


function itemsRouter(mongodb) {

  var database = require('./database')(mongodb);
  var middleware = require('./middleware')(database);

  router.post('/', middleware.addItem);

  router.get('/', middleware.getItems);

  return router;
}

module.exports = itemsRouter;