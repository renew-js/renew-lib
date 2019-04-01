import ConnectModule from '../../../src/features/connect';
import { Tester } from '../../Tester';


describe('modules/connect - Connect', () => {
    let diagram;
    let connect;
    let shape1;
    let shape2;
    let canvas;

    beforeEach(() => {
        diagram = new Tester({ modules: [ ConnectModule ] });
        connect = diagram.get('connect');
        canvas = diagram.get('canvas');
        const elementFactory = diagram.get('elementFactory');

        shape1 = elementFactory.createShape({
            id: 'shape1', x: 100, y: 200, width: 300, height: 400,
        });
        shape2 = elementFactory.createShape({
            id: 'shape2', x: 500, y: 200, width: 300, height: 400,
        });

        canvas.addShape(shape1);
        canvas.addShape(shape2);
    });

    it('should be defined', () =>

        expect(connect).toBeDefined());

    describe('Provider', () => {

        it('should have a default factory', () => {
            expect(connect.factory.constructor.name).toBe('DefaultFactory');
        });

        it('should reset to default factory', () => {
            connect.factory = null;
            connect.resetFactory();

            expect(connect.factory.constructor.name).toBe('DefaultFactory');
        });

        it('should create a connection', () => {
            const from = { x: 50, y: 55 };
            const to = { x: 60, y: 80 };
            const connection = connect.connection(from, to);

            expect(connection).toBeDefined();
            expect(connection.waypoints[0]).toEqual({ x: 50, y: 55 });
            expect(connection.waypoints[1]).toEqual({ x: 60, y: 80 });
        });

    });

    describe('Behavior', () => {
        let eventBus;

        beforeEach(() => eventBus = diagram.get('eventBus'));

        it('should draw a connection on canvas', () => {
            const from = { x: 50, y: 55 };
            const to = { x: 60, y: 80 };

            eventBus.fire('connect.elements', {
                sx: from.x, sy: from.y, x: to.x, y: to.y,
            });

            const elements = canvas.getRootElement().children;
            const connection = elements[elements.length-1];

            expect(connection.constructor.name).toBe('Connection');
            expect(connection.waypoints[0].x).toBe(50);
            expect(connection.waypoints[0].y).toBe(55);
            expect(connection.waypoints[1].x).toBe(60);
            expect(connection.waypoints[1].y).toBe(80);
        });

        it('should connect source shape on canvas', () => {
            const to = { x: 60, y: 80 };

            eventBus.fire('connect.elements', {
                hoverStart: shape1,
                x: to.x,
                y: to.y,
            });

            const elements = canvas.getRootElement().children;
            const connection = elements[elements.length-1];

            expect(shape1.outgoing.length).toBe(1);
            expect(connection.waypoints[0].x).toBe(250);
            expect(connection.waypoints[0].y).toBe(400);
            expect(connection.waypoints[1].x).toBe(60);
            expect(connection.waypoints[1].y).toBe(80);
        });

        it('should connect target shape on canvas', () => {
            const from = { x: 50, y: 55 };

            eventBus.fire('connect.elements', {
                sx: from.x, sy: from.y, hover: shape1,
            });

            const elements = canvas.getRootElement().children;
            const connection = elements[elements.length-1];

            expect(connection.constructor.name).toBe('Connection');
            expect(shape1.incoming.length).toBe(1);
            expect(connection.waypoints[0].x).toBe(50);
            expect(connection.waypoints[0].y).toBe(55);
            expect(connection.waypoints[1].x).toBe(250);
            expect(connection.waypoints[1].y).toBe(400);
        });

    });

    describe('Tool', () => {
        let toolbox;

        beforeEach(() => {
            toolbox = diagram.get('toolbox');
        });

        it('should have set the factory on enable', () => {
            toolbox.activate('connect', { factory: { create: () => { } } });

            expect(connect.factory).toBeDefined();
            expect(typeof connect.factory.create).toBe('function');
            expect(connect.factory.constructor.name).not.toBe('DefaultFactory');
        });

        it('should reset to default factory on disable', () => {
            connect.factory = null;

            toolbox.activate('connect');
            toolbox.activate('some other tool');

            expect(connect.factory.constructor.name).toBe('DefaultFactory');
        });
    });

});
