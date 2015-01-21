describe('mc-fridge-magnets', function() {

  beforeEach(module('mcFridgeMagnets'));

  describe('mcFridgeService', function() {

    var mcFridgeService;

    beforeEach(inject(function(_mcFridgeService_) {
      mcFridgeService = _mcFridgeService_;
    }));

    describe('.splitStringIntoWordsAndPunctuation()', function() {
      it('should break the input string into an array of strings', function () {

        var string = "How are you doing, Tom? I'm doing fine.  Look out!";
        var expectedOutput = ["How", 
                              "are", 
                              "you", 
                              "doing", 
                              ",", 
                              "Tom", 
                              "?", 
                              "I'm", 
                              "doing", 
                              "fine", 
                              ".", 
                              "Look", 
                              "out", 
                              "!"];

        var output = mcFridgeService.splitStringIntoWordsAndPunctuation(string);
        expect(output).to.deep.equal(expectedOutput);
      });

      it('should return an array of length 0 when given an empty string', function () {
        var emptyString = "";
        var output = mcFridgeService.splitStringIntoWordsAndPunctuation(emptyString);
        expect(output).to.have.length(0);
      });
    });


  });
});