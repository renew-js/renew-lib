import { Tester } from '../../Tester';
import CreateModule from '../../../src/features/create';
import { TestFactory } from '../../util/TestFactory';

describe('modules/create - Create', () => {
    let diagram;
    let create;
    let canvas;
    let root;

    beforeEach(() => {
        diagram = new Tester({ modules: [ CreateModule ] });
        create = diagram.get('create');
        canvas = diagram.get('canvas');
        root = canvas.getRootElement();
    });

    it('should be defined', () => expect(create).toBeDefined());

    describe('Provider', () => {

        it('should creat a shape', () => {
            const element = create.shape(50, 150);

            expect(element.x).toBe(50);
            expect(element.y).toBe(150);
        });

        it('should creat a connection', () => {
            const src = { x: 20, y: 40 };
            const dest = { x: 45, y: 25 };
            const element = create.connection(src, dest);

            expect(element.waypoints).toBeDefined();
            expect(element.source).toEqual(src);
            expect(element.target).toEqual(dest);
            expect(element.waypoints[0].x).toBe(20);
            expect(element.waypoints[0].y).toBe(40);
            expect(element.waypoints[1].x).toBe(45);
            expect(element.waypoints[1].y).toBe(25);
        });

        it('should creat a label', () => {
            const position = { x: 50, y: 100 };
            const element = create.label('hello world', position);

            expect(element.text).toBe('hello world');
        });

    });

    describe('Command', () => {
        let commandStack;

        beforeEach(() => commandStack = diagram.get('commandStack'));

        it('should create a shape', function () {
            const count = canvas.getRootElement().children.length;

            commandStack.execute('create.shape', {
                shape: create.shape(50, 60),
            });

            expect(root.children.length).toBe(count + 1);
            expect(root.children[0].x).toBe(50);
            expect(root.children[0].y).toBe(60);
        });

        it('should create a shape without a specific shape', function () {
            const count = canvas.getRootElement().children.length;

            commandStack.execute('create.shape', { x: 50, y: 60 });

            expect(root.children.length).toBe(count + 1);
            expect(root.children[0].x).toBe(50);
            expect(root.children[0].y).toBe(60);
        });

    });

    describe('Behavior', () => {
        let eventBus;

        beforeEach(() => eventBus = diagram.get('eventBus'));

        it('should create a shape', function () {
            const count = canvas.getRootElement().children.length;

            eventBus.fire('create.shape', { x: 50, y: 60 });

            expect(root.children.length).toBe(count + 1);
            expect(root.children[0].x).toBe(50);
            expect(root.children[0].y).toBe(60);
        });

        it('should create a center oriented shape', function () {
            const count = canvas.getRootElement().children.length;

            eventBus.fire('create.shape.center', {
                x: 50, y: 60, width: 25, height: 20,
            }, true);

            expect(root.children.length).toBe(count + 1);
            expect(root.children[count]).toBeDefined();
            expect(root.children[count].x).toBe(37.5);
            expect(root.children[count].y).toBe(50);
        });

        it('should create a connection', () => {
            const count = canvas.getRootElement().children.length;

            eventBus.fire('create.connection', {
                sx: 50, sy: 60, x: 70, y: 80
            });

            expect(root.children.length).toBe(count + 1);
            expect(root.children[count]).toBeDefined();
            expect(root.children[count].waypoints).toBeDefined();
            expect(root.children[count].waypoints[0].x).toBe(50);
            expect(root.children[count].waypoints[0].y).toBe(60);
            expect(root.children[count].waypoints[1].x).toBe(70);
            expect(root.children[count].waypoints[1].y).toBe(80);
        });

        it('should create a label', () => {
            const count = canvas.getRootElement().children.length;

            eventBus.fire('create.label', { text: 'test', x: 70, y: 80 });

            const root = canvas.getRootElement();

            expect(root.children.length).toBe(count + 1);
            expect(root.children[count]).toBeDefined();
            expect(root.children[count].text).toBe('test');
            expect(root.children[count].x).toBe(70);
            expect(root.children[count].y).toBe(80);
        });

        it('should create a center oriented label', function () {
            const count = canvas.getRootElement().children.length;

            eventBus.fire('create.shape.center', {
                x: 50, y: 60, width: 25, height: 20,
            }, true);

            expect(root.children.length).toBe(count + 1);
            expect(root.children[count]).toBeDefined();
            expect(root.children[count].x).toBe(37.5);
            expect(root.children[count].y).toBe(50);
        });

    });

    describe('Tool', () => {
        let toolbox;
        let factory;
        let testFactory;

        beforeEach(() => {
            toolbox = diagram.get('toolbox');
            factory = diagram.get('factory');
        });

        beforeAll(() => {
            testFactory = new TestFactory();
        });

        it('should set the factory of enable', () => {
            const event = { x: 0, y: 0, factory: testFactory };
            toolbox.activate('create.shape', event);

            expect(factory.factory.constructor.name).toBe('TestFactory');
        });

        it('should reset the factory of disable', () => {
            const event = { x: 0, y: 0, factory: testFactory };
            toolbox.activate('create.shape', event);
            expect(factory.factory.constructor.name).toBe('TestFactory');

            toolbox.activate('test');
            expect(factory.factory.constructor.name).toBe('DefaultFactory');

            toolbox.activate('create.connection', event);
            expect(factory.factory.constructor.name).toBe('TestFactory');

            toolbox.activate('test');
            expect(factory.factory.constructor.name).toBe('DefaultFactory');

            toolbox.activate('create.label', event);
            expect(factory.factory.constructor.name).toBe('TestFactory');

            toolbox.activate('test');
            expect(factory.factory.constructor.name).toBe('DefaultFactory');
        });

    });
});
