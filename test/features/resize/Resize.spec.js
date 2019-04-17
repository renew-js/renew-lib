import ResizeModule from '../../../src/features/resize';
import { Tester } from '../../Tester';


describe('modules/resize - Resize', () => {
    let diagram;
    let shape_1; let shape_2;
    let resize;

    beforeEach(() => diagram = new Tester({ modules: [ ResizeModule ] }));

    beforeEach(() => resize = diagram.get('resize'));

    beforeEach(() => diagram.invoke(function (canvas, elementFactory) {
        shape_1 = elementFactory.createShape({
            id: 'shape_1', x: 100, y: 200, width: 300, height: 400,
        });
        shape_2 = elementFactory.createShape({
            id: 'shape_2', x: 500, y: 200, width: 300, height: 400,
        });

        canvas.addShape(shape_1);
        canvas.addShape(shape_2);
    }));

    it('should be defined', () => {
        expect(resize).toBeDefined();
    });


    describe('Provider', () => {

        it('should resize a shape', () => {
            resize.element(shape_1).dimension(50, 100, 600, 550);

            expect(shape_1.x).toBe(50);
            expect(shape_1.y).toBe(100);
            expect(shape_1.width).toBe(600);
            expect(shape_1.height).toBe(550);
        });

    });

});
