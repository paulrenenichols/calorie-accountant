var MongoClient = require('mongodb').MongoClient;

var express = require('express');
var router = express.Router();

var itemsRouter = require('./items/router');
var usersRouter = require('./users/router');
var mongoRouter = require('./mongo/router');

//I don't like how this is built.
//I bet we're returning this router object before the 
//router.use calls in MongoClient.connect.  This is slopping, 
//needs fixing.

function buildAPIRouter(url) {

  MongoClient.connect(url, function(err, db) {
    console.log('connected to server');

    router.use('/items', itemsRouter(db));
    router.use('/users', usersRouter(db));
    router.use('/mongo', mongoRouter(db));

  });

  return router;
}

module.exports = buildAPIRouter;
