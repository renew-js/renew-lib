import Modeler from '../../src/Modeler';


describe('instances - Modeler', () => {
    let modeler;

    beforeEach(() => {
        modeler = new Modeler();
    });

    it('should be defined', function () {
        expect(modeler).toBeDefined();
    });
});
