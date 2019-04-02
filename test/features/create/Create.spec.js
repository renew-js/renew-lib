import { Tester } from '../../Tester';
import CreateModule from '../../../src/features/create';
import { TestFactory } from '../../util/TestFactory';

describe('modules/create - Create', () => {
    let diagram;
    let create;
    let canvas;

    beforeEach(() => {
        diagram = new Tester({ modules: [ CreateModule ] });
        create = diagram.get('create');
        canvas = diagram.get('canvas');
    });

    it('should be defined', () =>

        expect(create).toBeDefined());

    describe('Provider', () => {

        it('should creat a shape', () => {
            const element = create.element(50, 150);

            expect(element.x).toBe(50);
            expect(element.y).toBe(150);
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
                x: 50, y: 60, width: 25, height: 20,
            }, true);

            const root = canvas.getRootElement();

            expect(root.children.length).toBe(count + 1);
            expect(root.children[0].x).toBe(37.5);
            expect(root.children[0].y).toBe(50);
        });

    });

    describe('Tool', () => {
        let toolbox;
        let testFactory;

        beforeEach(() => {
            toolbox = diagram.get('toolbox');
        });

        beforeAll(() => {
            testFactory = new TestFactory();
        });

        it('should set the factory of enable', () => {
            toolbox.activate('create', { factory: testFactory });
            const factory = diagram.get('factory');

            expect(factory.factory.constructor.name).toBe('TestFactory');
        });

        it('should reset the factory of disable', () => {
            toolbox.activate('create', { factory: testFactory });
            toolbox.activate('test');
            const factory = diagram.get('factory');

            expect(factory.factory.constructor.name).toBe('DefaultFactory');
        });

        it('should have a position', () => {
            document.dispatchEvent(new MouseEvent('mousemove', {
                pageX: 250,
                pageY: 320,
            }));
            toolbox.activate('create');
        });

    });
});
