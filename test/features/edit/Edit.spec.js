import { Tester } from '../../Tester';
import EditModule from '../../../src/features/edit';


describe('modules/edit - Edit', () => {
    let diagram;
    let edit;

    beforeEach(() => {
        diagram = new Tester({ modules: [ EditModule ] });
        edit = diagram.get('edit');
    });

    it('should be defined', () => expect(edit).toBeDefined());

    describe('Provider', () => {

    });

});
