import RemoveModule from '../../../src/features/remove';
import { Tester } from '../../Tester';


describe('modules/remove - Remove', () => {
    let diagram;
    let shape_1, shape_2, shape_3, connection_1;
    let canvas, elementFactory;
    let remove;

    beforeEach(() => diagram = new Tester({ modules: [ RemoveModule ] }));

    beforeEach(() => remove = diagram.get('remove'));

    beforeEach(() => canvas = diagram.get('canvas'));

    beforeEach(() => elementFactory = diagram.get('elementFactory'));

    beforeEach(() => {
        shape_1 = elementFactory.createShape({
            id: 'shape_1', x: 100, y: 200, width: 300, height: 400,
        });
        shape_2 = elementFactory.createShape({
            id: 'shape_2', x: 500, y: 200, width: 300, height: 400,
        });
        shape_3 = elementFactory.createShape({
            id: 'shape_3', x: 600, y: 500, width: 300, height: 400,
        });
        connection_1 = elementFactory.createConnection({
            id: 'connection_1',
            waypoints: [ { x: 650, y: 400 }, { x: 750, y: 700 } ],
            source: shape_2,
            target: shape_3
        });

        canvas.addShape(shape_1);
        canvas.addShape(shape_2);
        canvas.addShape(shape_3);
        canvas.addConnection(connection_1);
    });

    it('should be defined', () => {
        expect(remove).toBeDefined();
    });

    describe('Provider', () => {

        it('should remove a shape', () => {
            const count = canvas.getRootElement().children.length;

            remove.elements(shape_1);

            expect(canvas.getRootElement().children.length).toBe(count - 1);
        });

        it('should remove a shape with its connections', () => {
            const count = canvas.getRootElement().children.length;

            remove.elements(shape_3);

            expect(canvas.getRootElement().children.length).toBe(count - 2);
        });

    });

    describe('Behavior', () => {
        let eventBus;

        beforeEach(() => eventBus = diagram.get('eventBus'));

        it('should remove a shape', () => {
            const count = canvas.getRootElement().children.length;

            eventBus.fire('remove.elements', { elements: shape_1 });

            expect(canvas.getRootElement().children.length).toBe(count - 1);
        });

        it('should remove a shape with its connections', () => {
            const count = canvas.getRootElement().children.length;

            eventBus.fire('remove.elements', { elements: shape_3 });

            expect(canvas.getRootElement().children.length).toBe(count - 2);
        });

    });

    describe('Command', () => {
        let commandStack;

        beforeEach(() => commandStack = diagram.get('commandStack'));

        it('should remove a shape', () => {
            const count = canvas.getRootElement().children.length;

            commandStack.execute('remove.elements', { elements: shape_1 });

            expect(canvas.getRootElement().children.length).toBe(count - 1);
        });

        it('should remove a shape with its connections', () => {
            const count = canvas.getRootElement().children.length;

            commandStack.execute('remove.elements', { elements: shape_3 });

            expect(canvas.getRootElement().children.length).toBe(count - 2);
        });

    });

});