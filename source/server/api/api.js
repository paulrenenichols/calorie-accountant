var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/calorie-accountant';
var express = require('express');
var router = express.Router();

var itemsRouter = require('./items/router');
var usersRouter = require('./users/router');

var mongodb = null;

MongoClient.connect(url, function(err, db) {
  console.log('connected to server');
  mongodb = db;

  router.use('/items', itemsRouter(db));
  router.use('/users', usersRouter(db));

});



module.exports = router;
