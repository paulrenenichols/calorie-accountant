describe('mc-fridge-magnets', function() {

  beforeEach(module('mcFridgeMagnets'));

  describe('mcFridgeMagnetService', function() {

    var mcFridgeMagnetService;

    beforeEach(inject(function(_mcFridgeMagnetsService_) {
      mcFridgeMagnetsService = _mcFridgeMagnetsService_;
    }));

    it('should return an empty object', function () {
      expect(mcFridgeMagnetService).to.be.empty;
    });
  });
});