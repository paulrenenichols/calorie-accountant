

var chai = require('chai');
var expect = require('chai').expect;
var sinon = require('sinon');

var database = require('../../../../../source/server/api/mongo/databases/database');


var mockAdminDB = {
  listDatabases: function (callback) {
    callback(null, {databases: [ 'bob', 'dave','calorie-accountant' ]});
  }
};

//var mockAdminDBStub = sinon.stub(mockAdminDB, "listDatabases");


var mockDB = {
  admin: function() {
    return mockAdminDB;
  }
};

//var mockDBStub = sinon.stub(mockDB, "admin");


describe('Mongo API Database code', function(){

  var db;

  beforeEach(function(done) {
    db = database(mockDB);
    done();
  });

  it('should return a list of 3 databases', function(done){
    db.getDB(function(err, databases) {
      expect(databases).to.have.length(3);
      done();
    });
  })
})
