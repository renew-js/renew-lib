import Modeler from '../../../src/Modeler';


describe('modules/snapping', () => {
    let modeler;

    beforeEach(() => {
        modeler = new Modeler();
    });

    it('says hello', () => {
        expect(modeler.constructor.name).equal('Modeler');
    });

});
