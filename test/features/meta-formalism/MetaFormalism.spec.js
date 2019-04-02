import { Tester } from '../../Tester';
import MetaFormalismModule from '../../../src/features/meta-formalism';

describe('modules/metaFormalism - MetaFormalism', () => {
    let diagram;
    let metaPluginManager;

    beforeEach(() => {
        diagram = new Tester({ modules: [ MetaFormalismModule ] });
        metaPluginManager = diagram.get('metaPluginManager');
    });

    it('should be defined', () =>

        expect(metaPluginManager).toBeDefined());

    describe('Provider', () => {

    });

});
