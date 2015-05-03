var Q = require('q');

function middleware(api){

  var mw = {};

  function addUser(req) {
    console.log('mw addUser');
    api.addUser(req.body)
      .then(
        function(result) {
          res.status(200).json({});
        },
        function(reason) {
          console.log('add User fail middleware: ', reason);
          res.status(500).json({
            error: reason, 
            message: 'addUser failure' 
          });
        }
      );
  }

  function authorizeUser(req, res) {
    console.log('authorizeUser', 'user', JSON.stringify(req.body, null, 2));
    api.authorizeUser(req.body, function(err, user) {
      if (err) {
        console.log('authorize user fail ', err);
        res.status(500).json({
          error: err,
          message: 'get failure'
        });
      }
      else {
        res.status(200).json({
          status: "logged in"
        });
      }
    });
  }

  mw.addUser = addUser;
  mw.authorizeUser = authorizeUser;

  return mw;

}

module.exports = middleware;