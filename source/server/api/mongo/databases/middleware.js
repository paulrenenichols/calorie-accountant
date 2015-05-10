

function middleware(db){

  var mw = {};

  function getDB(req, res) {
    console.log('add user');
    db.getDB(function(err, result) {
      if (err) {
        console.log('get database fail: ', err);
        res.status(500).json({
          error: err, 
          message: 'get database failure' 
        });
      }
      else {
        res.status(200).json(result);
      }
    });
  }

  mw.getDB = getDB;

  return mw;

}

module.exports = middleware;