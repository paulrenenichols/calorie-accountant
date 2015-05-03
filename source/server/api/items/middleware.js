var Q = require('q');

function middleware(db){

  var mw = {};

  function addItem(req, res) {
    console.log('mw addItem');
    db.addItem(req.body)
      .then(
        function(result) {
          res.status(200).json({});
        },
        function(reason) {
          console.log('add items fail: ', reason);
          res.status(500).json({
            error: reason, 
            message: 'insert failure' 
          });
        }
      );
  }

  function getItems(req, res) {
    console.log('mw getItems');
    db.getItems().then(
      function(items){
        console.log('success, items: ', items);
        console.log('items: ', items);
        res.status(200).json(items);
      },
      function(reason) {
        console.log('get items fail ', reason);
        res.status(500).json({
          error: reason,
          message: 'get failure'
        });
      }
    );
  }

  mw.addItem = addItem;
  mw.getItems = getItems;

  return mw;

}

module.exports = middleware;