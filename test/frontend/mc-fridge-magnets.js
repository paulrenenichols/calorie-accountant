describe('mc-fridge-magnets', function() {

  beforeEach(module('mcFridgeMagnets'));

  describe('mcFridgeMagnetService', function() {

    var mcFridgeMagnetsService;

    beforeEach(inject(function(_mcFridgeMagnetsService_) {
      mcFridgeMagnetsService = _mcFridgeMagnetsService_;
    }));

    describe('.splitString()', function() {
      it('should put a space before periods and commas that come at the end of words', function () {

        var string = "How are you doing, Tom.";
        var expectedOutput = "How are you doing , Tom .";
        expect(mcFridgeMagnetsService.splitString(string)).to.equal(expectedOutput);
      });
    });
  });
});