var bcrypt = require("bcrypt");
var Q = require('q');

function api(db) {

  var obj = {};

  function hashPassword(user) {

    var deferred = Q.defer();

    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        console.log('db addUser', 'error', err, 'result', user);
        if (err) {
          deferred.reject(err);
        }
        else {
          delete user.password;
          user.hash = hash;
          console.log('db addUser', 'error', err, 'result', user);
          deferred.resolve(user);
        }
      });
    });
    return deferred.promise;
  }

  function addUser(user) {
    return hashPassword(user)
      .then( function (user){
        console.log('hash success in api', user);
        return db.addUser(user);
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