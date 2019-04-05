import { Tester } from '../../Tester';
import MarkerModule from '../../../src/features/marker';


describe('modules/marker - Marker', () => {
    let diagram;
    let marker;

    beforeEach(() => {
        diagram = new Tester({ modules: [ MarkerModule ] });
        marker = diagram.get('marker');
    });

    it('should be defined', () => expect(marker).toBeDefined());

    describe('Provider', () => {

    });

});
