
function database(mongodb){

  var db = {};

  function addDB(name, callback) {
    
  }

  function getDB(callback){

    // Use the admin database for the operation
    var adminDb = mongodb.admin();
    // List all the available databases
    adminDb.listDatabases(function(err, dbs) {
      if (err) {
        callback(err, null);
      }
      else {
        callback(null, dbs.databases);
      }
    });

  }

  db.addDB = addDB;
  db.getDB = getDB;

  return db;
}

module.exports = database;