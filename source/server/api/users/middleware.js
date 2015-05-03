var Q = require('q');

function middleware(api){

  var mw = {};

  function addUser(req, res) {
    console.log('mw addUser');
    api.addUser(req.body)
      .then(
        function(result) {
          console.log('mw addUser: ', 'success');
          res.status(200).json({});
        },
        function(reason) {
          console.log('mw addUser: ', 'FAIL: ', reason);
          res.status(500).json({
            error: reason, 
            message: 'addUser failure' 
          });
        }
      );
  }

  function authorizeUser(req, res) {
    console.log('mw authorizeUser: ', 'user: ', JSON.stringify(req.body, null, 2));
    api.authorizeUser(req.body)
      .then(
        function (result) {
          console.log('mw authorizeUser success ');
          res.status(200).json({
            status: "logged in"
          });
        },
        function (reason) {
          console.log('mw authorizeUser FAIL ', err);
          res.status(500).json({
            error: err,
            message: 'authorization failure'
          });
        }
      );
  }

  mw.addUser = addUser;
  mw.authorizeUser = authorizeUser;

  return mw;

}

module.exports = middleware;