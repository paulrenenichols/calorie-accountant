 
function mongo(mongodb){

  var obj = {};

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

  obj.addItem = addItem;
  obj.getItems = getItems;

  return obj;
}

module.exports = mongo;