import RemoveModule from '../../../src/features/remove';
import { Tester } from '../../Tester';


describe('modules/remove - Remove', () => {
    let diagram;
    let shape1;
    let shape2;
    let shape3;
    let connection1;
    let canvas;
    let elementFactory;
    let remove;

    beforeEach(() => diagram = new Tester({ modules: [ RemoveModule ] }));

    beforeEach(() => remove = diagram.get('remove'));

    beforeEach(() => canvas = diagram.get('canvas'));

    beforeEach(() => elementFactory = diagram.get('elementFactory'));

    beforeEach(() => {
        shape1 = elementFactory.createShape({
            id: 'shape1', x: 100, y: 200, width: 300, height: 400,
        });
        shape2 = elementFactory.createShape({
            id: 'shape2', x: 500, y: 200, width: 300, height: 400,
        });
        shape3 = elementFactory.createShape({
            id: 'shape3', x: 600, y: 500, width: 300, height: 400,
        });
        connection1 = elementFactory.createConnection({
            id: 'connection1',
            waypoints: [ { x: 650, y: 400 }, { x: 750, y: 700 } ],
            source: shape2,
            target: shape3,
        });

        canvas.addShape(shape1);
        canvas.addShape(shape2);
        canvas.addShape(shape3);
        canvas.addConnection(connection1);
    });

    it('should be defined', () => {
        expect(remove).toBeDefined();
    });

    describe('Provider', () => {

        it('should remove a shape', () => {
            const count = canvas.getRootElement().children.length;

            remove.elements(shape1);

            expect(canvas.getRootElement().children.length).toBe(count - 1);
        });

        it('should remove a shape with its connections', () => {
            const count = canvas.getRootElement().children.length;

            remove.elements(shape3);

            expect(canvas.getRootElement().children.length).toBe(count - 2);
        });

    });

    describe('Behavior', () => {
        let eventBus;

        beforeEach(() => eventBus = diagram.get('eventBus'));

        it('should remove a shape', () => {
            const count = canvas.getRootElement().children.length;

            eventBus.fire('remove.elements', { elements: shape1 });

            expect(canvas.getRootElement().children.length).toBe(count - 1);
        });

        it('should remove a shape with its connections', () => {
            const count = canvas.getRootElement().children.length;

            eventBus.fire('remove.elements', { elements: shape3 });

            expect(canvas.getRootElement().children.length).toBe(count - 2);
        });

    });

    describe('Command', () => {
        let commandStack;

        beforeEach(() => commandStack = diagram.get('commandStack'));

        it('should remove a shape', () => {
            const count = canvas.getRootElement().children.length;

            commandStack.execute('remove.elements', { elements: shape1 });

            expect(canvas.getRootElement().children.length).toBe(count - 1);
        });

        it('should remove a shape with its connections', () => {
            const count = canvas.getRootElement().children.length;

            commandStack.execute('remove.elements', { elements: shape3 });

            expect(canvas.getRootElement().children.length).toBe(count - 2);
        });

    });

});
