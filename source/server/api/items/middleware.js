
function middleware(db){

  var mw = {};

  function addItem(req, res) {
    console.log('add item');
    db.addItem(req.body, function(err, result) {
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
  }

  function getItems(req, res) {
    console.log('/get-items');
    db.getItems(function(err, items){
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
  }

  mw.addItem = addItem;
  mw.getItems = getItems;

  return mw;

}

module.exports = middleware;