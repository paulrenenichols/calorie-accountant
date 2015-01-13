describe('mc-fridge-magnets', function() {

  beforeEach(module('mcFridgeMagnets'));

  describe('mcFridgeMagnetService', function() {

    var mcFridgeMagnetsService;

    beforeEach(inject(function(_mcFridgeMagnetsService_) {
      mcFridgeMagnetsService = _mcFridgeMagnetsService_;
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

        var output = mcFridgeMagnetsService.splitStringIntoWordsAndPunctuation(string);
        console.log('output', output);
        expect(output).to.deep.equal(expectedOutput);
      });
    });
  });
});