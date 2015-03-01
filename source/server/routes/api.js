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
  console.log('/add-item', 'req', JSON.stringify(req, null, 2));
  console.log('/add-item', 'res', JSON.stringify(res, null, 2));

  addItem(req.body);

  res.status(200).json({});
});

router.get('/get-items', function(req, res) {
  console.log('/get-items', 'req', JSON.stringify(req, null, 2));
  console.log('/get-items', 'res', JSON.stringify(res, null, 2));

  res.json(getItems());
});

module.exports = router;
