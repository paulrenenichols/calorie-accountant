

function middleware(api){

  var mw = {};

  function addUser(req, res) {
    console.log('add user');
    api.addUser(req.body, function(err, result) {
      if (err) {
        console.log('add user fail: ', err);
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