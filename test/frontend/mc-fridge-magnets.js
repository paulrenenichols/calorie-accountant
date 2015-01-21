describe('mc-fridge-magnets', function() {

  beforeEach(module('mcFridgeMagnets'));

  describe('mcFridgeService', function() {

    var mcFridgeService;

    beforeEach(inject(function(_mcFridgeService_) {
      mcFridgeService = _mcFridgeService_;
    }));

    it('should exist', function () {
      expect(mcFridgeService).to.exist;
    });

    it('should not be empty', function () {
      expect(mcFridgeService).to.not.be.empty;
    });

    describe('.splitStringIntoWordsAndPunctuation()', function() {

      it('should have a function named splitStringIntoWordsAndPunctuation()', function () {
        expect(mcFridgeService).to.have.property('splitStringIntoWordsAndPunctuation').that.is.a('function');
      });

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


    describe('.createSentenceFromWords()', function () {
      it('should have a function named createSentenceFromWords()', function () {
        expect(mcFridgeService).to.have.property('createSentenceFromWords').that.is.a('function');
      });
    });

  });

  describe('mcMagnetService', function() {

    var mcMagnetService;

    beforeEach(inject(function(_mcMagnetService_) {
      mcMagnetService = _mcMagnetService_;
    }));

    it('should exist', function () {
      expect(mcMagnetService).to.exist;
    });

    it('should not be empty', function () {
      expect(mcMagnetService).to.not.be.empty;
    });

    describe('.bindDragHandlers()', function () {
      it('should have a function named bindDragHandlers()', function () {
        expect(mcMagnetService).to.have.property('bindDragHandlers').that.is.a('function');
      });
    });

    describe('.unbindDragHandlers()', function () {
      it('should have a function named unbindDragHandlers()', function () {
        expect(mcMagnetService).to.have.property('unbindDragHandlers').that.is.a('function');
      });
    });
  });
});