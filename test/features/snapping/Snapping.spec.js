import SnappingModule from '../../../src/features/snapping';
import { Tester } from '../../Tester';


describe('modules/snapping - Snapping', () => {
    let diagram;
    // let shape_1, shape_2;
    let snapping;

    beforeEach(() => diagram = new Tester({ modules: [ SnappingModule ] }));

    beforeEach(() => snapping = diagram.get('snapping'));

    // beforeEach(() => diagram.invoke(function (canvas, elementFactory) {
    //     shape_1 = elementFactory.createShape({
    //         id: 'shape_1', x: 100, y: 200, width: 300, height: 400,
    //     });
    //     shape_2 = elementFactory.createShape({
    //         id: 'shape_2', x: 500, y: 200, width: 300, height: 400,
    //     });
    //
    //     canvas.addShape(shape_1);
    //     canvas.addShape(shape_2);
    // }));

    it('should be defined', () => {
        expect(snapping).toBeDefined();
    });

    describe('Provider', () => {

    });

});
