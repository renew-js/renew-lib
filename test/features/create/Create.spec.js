import { Tester } from '../../Tester';
import CreateModule from '../../../src/features/create';

describe('modules/create - Create', () => {
    let diagram;
    let create;
    let canvas;

    beforeEach(() => {
        diagram = new Tester({ modules: [ CreateModule, ] });
        create = diagram.get('create');
        canvas = diagram.get('canvas');
    });

    it('should be defined', () => expect(create).toBeDefined());

    describe('Provider', () => {

        it('should creat a shape', () => {
            let element = create.element(50, 150);

            expect(element.x).toBe(50);
            expect(element.y).toBe(150);
        });

        it('should reset the factory', () => {
            create.factory = null;

            create.resetFactory();

            expect(create.factory.constructor.name).toBe('DefaultFactory');
        });

    });

    describe('Command', () => {
        let commandStack;

        beforeEach(() => commandStack = diagram.get('commandStack'));

        it('should create a shape', function () {
            const count = canvas.getRootElement().children.length;

            commandStack.execute('create.element', {
                shape: create.element(50, 60),
            });

            const root = canvas.getRootElement();
            expect(root.children.length).toBe(count + 1);
            expect(root.children[0].x).toBe(50);
            expect(root.children[0].y).toBe(60);
        });

        it('should create a shape without a specific shape', function () {
            const count = canvas.getRootElement().children.length;

            commandStack.execute('create.element', { x: 50, y: 60 });

            const root = canvas.getRootElement();
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

            eventBus.fire('create.element', { x: 50, y: 60 });

            const root = canvas.getRootElement();
            expect(root.children.length).toBe(count + 1);
            expect(root.children[0].x).toBe(50);
            expect(root.children[0].y).toBe(60);
        });

        it('should create a center oriented shape', function () {
            const count = canvas.getRootElement().children.length;

            eventBus.fire('create.element.center', {
                x: 50, y: 60, width: 25, height: 20
            }, true);

            const root = canvas.getRootElement();
            expect(root.children.length).toBe(count + 1);
            expect(root.children[0].x).toBe(37.5);
            expect(root.children[0].y).toBe(50);
        });

        it('should set the factory', function () {
            eventBus.fire('create.factory.set', {
                factory: {
                    create: () => 'test',
                }
            });

            expect(create.factory.create()).toBe('test');
        });

        it('should not set the factory', function () {
            eventBus.fire('create.factory.set', { factory: { } });

            expect(create.factory.constructor.name).toBe('DefaultFactory');
        });

        it('should reset the factory', function () {
            create.factory = null;
            eventBus.fire('create.factory.reset');

            expect(create.factory.constructor.name).toBe('DefaultFactory');
        });

    });

    describe('Tool', () => {
        let toolbox;

        beforeEach(() => {
            toolbox = diagram.get('toolbox');
            toolbox.activate('create');
        });


    })
});
