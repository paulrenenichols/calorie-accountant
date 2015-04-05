
function middleware(db){

  var mw = {};

  function addUser(req, res) {
    console.log('add user');
    db.addUser(req.body, function(err, result) {
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
    db.getUser(req.body.email, function(err, user){
      if (err) {
        console.log('authorize user fail ', err);
        res.status(500).json({
          error: err,
          message: 'get failure'
        });
      }
      else {
        if(user.password === req.body.password) {
          res.status(200).json({
            status: "logged in"
          });
        }
        else {
          res.status(500).json({
            message: 'auth failed'
          });
        }
        
      }
    });
  }

  mw.addUser = addUser;
  mw.authorizeUser = authorizeUser;

  return mw;

}

module.exports = middleware;