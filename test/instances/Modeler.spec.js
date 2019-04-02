import Modeler from '../../src/Modeler';


describe('instances/modeler - Modeler', () => {
    let modeler;

    beforeEach(() => {
        modeler = new Modeler();
    });

    it('should be defined', function () {
        expect(modeler).toBeDefined();
    });
});
