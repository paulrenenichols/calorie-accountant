var express = require('express');
var router = express.Router();


function usersRouter(mongodb) {

  var database = require('./database')(mongodb);
  var middleware = require('./middleware')(database);

  router.post('/signup', middleware.addUser);

  router.post('/auth', middleware.authorizeUser);

  return router;
}

module.exports = usersRouter;