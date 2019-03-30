import { Tester } from '../../Tester';
import CreateModule from '../../../src/features/create';

describe('modules/create - Create', () => {
    let diagram;
    let create;

    beforeEach(() => diagram = new Tester({ modules: [ CreateModule ] }));

    beforeEach(() => create = diagram.get('create'));

    it('should be defined', () => {
        expect(create).toBeDefined();
    });

    describe('Command', () => {
        let commandStack;
        let canvas;
        let elementFactory;

        beforeEach(() => commandStack = diagram.get('commandStack'));

        beforeEach(() => canvas = diagram.get('canvas'));

        beforeEach(() => elementFactory = diagram.get('elementFactory'));

        it('should create a shape', function () {
            const attributes = {
                id: 'shape-test-20583',
                type: 'Shape',
                width: 42,
                height: 42,
            };

            expect(canvas.getDefaultLayer().children.length).toBe(0);

            commandStack.execute('tool.shape.create', {
                shape: elementFactory.createShape(attributes),
                position: { x: 50, y: 60 },
            });

            expect(canvas.getDefaultLayer().children.length).toBe(1);
        });

    });

});
