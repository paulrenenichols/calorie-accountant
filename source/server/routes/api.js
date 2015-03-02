var express = require('express');
var router = express.Router();

var items = [];

function getItems() {
  return items;
}

function addItem(item) {
  items.unshift(item);
}

router.post('/add-item', function(req, res) {

  addItem(req.body);

  res.status(200).json({});
});

router.get('/get-items', function(req, res) {
  console.log('/get-items', JSON.stringify(items, null, 2));

  res.json(getItems());
});

module.exports = router;
