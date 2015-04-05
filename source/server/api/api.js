var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/calorie-accountant';
var express = require('express');
var router = express.Router();

var mongodb = null;

MongoClient.connect(url, function(err, db) {
  console.log('connected to server');
  mongodb = db;
});

function addItemToDB(item, callback) {
  console.log('addItemToDB', item);
  var collection = mongodb.collection('items');
  collection.insert(item, callback);
}

function getItemsFromDB(callback) {
  console.log('getItemsFromDB');
  var collection = mongodb.collection('items');
  collection.find().toArray(callback);
}

function getItems(callback) {
  getItemsFromDB(callback);
}

function addItem(item, callback) {
  addItemToDB(item, callback);
}

router.post('/add-item', function(req, res) {
  console.log('add item');
  addItem(req.body, function(err, result) {
    if (err) {
      console.log('add items fail: ', err);
      res.status(500).json({
        error: err, 
        message: 'insert failure' 
      });
    }
    else {
      res.status(200).json({});
    }
  });
});

router.get('/get-items', function(req, res) {
  console.log('/get-items');
  getItems(function(err, items){
    if (err) {
      console.log('get items fail ', err);
      res.status(500).json({
        error: err,
        message: 'get failure'
      });
    }
    else {
      console.log('items: ', items);
      res.status(200).json(items);
    }
  });
});

module.exports = router;
