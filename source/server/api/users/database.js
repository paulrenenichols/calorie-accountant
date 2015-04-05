 
function database(mongodb){

  var db = {};

  function addUser(user, callback) {
    console.log('addUser', user);
    var collection = mongodb.collection('users');
    collection.insert(user, callback);
  }

  function getUser(userEmail, callback) {
    console.log('getUser');
    var collection = mongodb.collection('users');
    collection.findOne({
      email: userEmail
    }, callback);
  }

  db.addUser = addUser;
  db.getUser = getUser;

  return db;
}

module.exports = database;