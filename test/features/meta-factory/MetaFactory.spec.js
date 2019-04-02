import { Tester } from '../../Tester';
import MetaFactoryModule from '../../../src/features/meta-factory';


describe('modules/metaFactory - MetaFactory', () => {
    let diagram;
    let metaFactory;

    beforeEach(() => {
        diagram = new Tester({ modules: [ MetaFactoryModule ] });
        metaFactory = diagram.get('metaFactory');
    });

    it('should be defined', () =>

        expect(metaFactory).toBeDefined());

    describe('Provider', () => {

    });

});
