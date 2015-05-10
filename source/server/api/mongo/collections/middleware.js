

function middleware(db){

  var mw = {};

  function getCollections(req, res) {
    console.log('mw getCollections');
    db.getCollections()
      .then (
        function(result) {
          console.log('mw getCollections: ', 'success');
          res.status(200).json({});
        },
        function(reason) {
          console.log('mw getCollections: ', err);
          res.status(500).json({
            error: err, 
            message: 'mw getCollections failure' 
          });
        );
  }

  function addCollection(req, res) {
    console.log('mw addCollection');
    db.addCollection(req.body)
      .then(
        function(result) {
          console.log('mw addCollection: ', 'success');
          res.status(200).json({});
        },
        function(reason) {
          console.log('mw addCollection: ', 'FAIL: ', reason);
          res.status(500).json({
            error: reason, 
            message: 'addCollection failure' 
          });
        }
      );

  }

  function removeCollection(req, res) {
    console.log('mw removeCollection');
    db.removeCollection(req.body)
      .then(
        function(result) {
          console.log('mw removeCollection: ', 'success');
          res.status(200).json({});
        },
        function(reason) {
          console.log('mw removeCollection: ', 'FAIL: ', reason);
          res.status(500).json({
            error: reason, 
            message: 'removeCollection failure' 
          });
        }
      );
  }

  mw.addCollection = addCollection;
  mw.getCollections = getCollections;
  mw.removeCollection = removeCollection;

  return mw;

}

module.exports = middleware;