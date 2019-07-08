import ResizeModule from '../../../src/features/resize';
import { Tester } from '../../Tester';
import { TestFactory } from '../../util/TestFactory';


describe('modules/resize - Resize', () => {
    let diagram;
    let shape_1; let shape_2;
    let resize;
    let canvas;
    let factory;

    beforeEach(() => {
        diagram = new Tester({ modules: [ ResizeModule ] });
        resize = diagram.get('resize');
        canvas = diagram.get('canvas');

        factory = new TestFactory();

        shape_1 = factory.createShape({
            id: 'shape_1', x: 100, y: 200, width: 300, height: 400,
        });
        shape_2 = factory.createShape({
            id: 'shape_2', x: 500, y: 200, width: 300, height: 400,
        });

        canvas.addShape(shape_1);
        canvas.addShape(shape_2);
    });

    it('should be defined', () => {
        expect(resize).toBeDefined();
    });


    describe('Provider', () => {

        it('should init the resize', function () {
            resize.init(50, 100);

            expect(resize.position.x).toBe(50);
            expect(resize.position.y).toBe(100);
        });

        it('should resize a shape', () => {
            resize.element(shape_1).dimension(50, 100, 600, 550);

            expect(shape_1.x).toBe(50);
            expect(shape_1.y).toBe(100);
            expect(shape_1.width).toBe(600);
            expect(shape_1.height).toBe(550);
        });

    });

    describe('Behavior', () => {
        let eventBus;

        beforeEach(() => eventBus = diagram.get('eventBus'));

        it('should init the resize with one element', () => {
            eventBus.fire('resize.element.init', {
                element: { x: 50, y: 100 },
            });

            expect(resize.position.x).toBe(50);
            expect(resize.position.y).toBe(100);
        });

        it('should resize a metaObject on create', () => {
            const metaObject = factory.createShape({
                x: 50, y: 40,
                width: 30, height: 15,
                metaObject: {
                    representation: {
                        name: 'rect',
                        type: 'element',
                        attributes: {
                            x: '0', y: '0',
                            width: '15', height: '10',
                        },
                        proportions: {
                            x: 0, y: 0,
                            width: 1, height: 1,
                        },
                        children: [],
                    },
                },
            });

            canvas.addShape(metaObject);

            const attributes = metaObject.metaObject.representation.attributes;

            expect(attributes.width).toBe(30);
            expect(attributes.height).toBe(15);
        });

    });

});
