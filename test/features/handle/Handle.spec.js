import { Tester } from '../../Tester';
import HandleModule from '../../../src/features/handle';


describe('modules/handle - Handle', () => {
    let diagram;
    let handle;

    beforeEach(() => {
        diagram = new Tester({ modules: [ HandleModule ] });
        handle = diagram.get('handle');
    });

    it('should be defined', () => expect(handle).toBeDefined());

    describe('Provider', () => {

    });

});
