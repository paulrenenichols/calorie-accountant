var bcrypt = require("bcrypt");
var Q = require('q');

function api(db) {

  var obj = {};

  function generateSalt() {
    var deferred = Q.defer();

    bcrypt.genSalt(10, function(err, salt) {
      if(err){
        console.log('api generateSalt', 'error', err);
        deferred.reject(err);
      }
      else {
        console.log('api generateSalt', 'resolved');
        deferred.resolve(salt);
      }
    });

    return deferred.promise;
  }

  function hashPassword(password, salt) {

    var deferred = Q.defer();

    bcrypt.hash(password, salt, function(err, hash) {

      if (err) {
        console.log('api hashPassword', 'error', err);
        deferred.reject(err);
      }
      else {
        console.log('api hashPassword', 'resolved');
        deferred.resolve(hash);
      }
    });

    return deferred.promise;
  }

  function addUser(user) {
    return generateSalt()
      .then( function (salt) {
        console.log('api addUser', 'salt success', salt);
        return hashPassword(user.password, salt)
          .then( function (hash){
            console.log('api addUser', 'hash success', hash);
            delete user.password;
            user.salt = salt;
            user.hash = hash;
            return db.addUser(user);
          });
      });
  }

  function authorizeUser(user){
    return db.getUser(user.email)
      .then( function (dbUser){

        return hashPassword(user.password, dbUser.salt)
          .then( function (hash) {
            console.log('user', user, 'dbUser', dbUser);
            if(hash === dbUser.hash) {
              console.log('api authorizeUser', 'authorization success');
              user._id = dbUser._id;
              return Q(user);
            }
            else {
              console.log('api authorizeUser', 'authorization FAIL');
              return Q.reject("failed user authorization");
            }
          });
      });
    }

  obj.addUser = addUser;
  obj.authorizeUser = authorizeUser;

  return obj;

}

module.exports = api;