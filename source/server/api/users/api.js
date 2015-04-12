var bcrypt = require("bcrypt");

function api(db) {

  var obj = {};

  function hashPassword(user, callback) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          callback(err, user);
        }
        else {
          delete user.password;
          user.hash = hash;
          callback(null, user);
        }
      });
    });
  }

  function addUser(user, callback) {
    hashPassword(user, function(err, user) {
      if(err) {
        callback(err, user);
      }
      else {
        db.addUser(user, function(err, result) {
          if (err) {
            callback(err, user);
          }
          else {
            callback(null, result);
          }
        });
      }
    });
  }

  function authorizeUser(user, callback){
    hashPassword(user, function(err, user){

      if(err){
        callback(err, user);
      }
      else {
        db.getUser(user.email, function(err, dbUser){
          if (err) {
            callback(err, dbUser);
          }
          else {
            if(user.hash === dbUser.hash) {
              callback(null, user);
            }
            else {
              callback(err, user);
            }
            
          }
        });
      }
    });
  }

  obj.addUser = addUser;
  obj.authorizeUser = authorizeUser;

  return obj;

}

module.exports = api;