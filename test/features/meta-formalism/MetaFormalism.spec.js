import { Tester } from '../../Tester';
import MetaFormalismModule from '../../../src/features/meta-formalism';

describe('modules/metaFormalism - MetaFormalism', () => {
    let diagram;
    let metaFormalism;

    beforeEach(() => {
        diagram = new Tester({ modules: [ MetaFormalismModule ] });
        metaFormalism = diagram.get('metaFormalism');
    });

    it('should be defined', () => expect(metaFormalism).toBeDefined());

    describe('Provider', () => {

    });

});
