 
function database(mongodb){

  var db = {};

  function addItem(item, callback) {
    console.log('addItemToDB', item);
    var collection = mongodb.collection('items');
    collection.insert(item, callback);
  }

  function getItems(callback) {
    console.log('getItemsFromDB');
    var collection = mongodb.collection('items');
    collection.find().toArray(callback);
  }

  db.addItem = addItem;
  db.getItems = getItems;

  return db;
}

module.exports = database;