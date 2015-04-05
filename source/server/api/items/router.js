var express = require('express');
var router = express.Router();


function itemsRouter(mongodb) {

  var mongo = require('./mongo')(mongodb);
  var middleware = require('./middleware')(mongo);

  router.post('/add-item', middleware.addItem);

  router.get('/get-items', middleware.getItems);

  return router;
}

module.exports = itemsRouter;