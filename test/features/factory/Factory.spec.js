import { Tester } from '../../Tester';
import FactoryModule from '../../../src/features/factory';
import { TestFactory } from '../../util/TestFactory';


describe('modules/factory - Factory', () => {
    let diagram;
    let factory;
    let testFactory;

    beforeEach(() => {
        diagram = new Tester({ modules: [ FactoryModule ] });
        factory = diagram.get('factory');
    });

    beforeAll(() => {
        testFactory = new TestFactory();
    });

    it('should be defined', () =>

        expect(factory).toBeDefined());

    describe('Provider', () => {

        it('should be the DefaultFactory at beginning', () => {
            expect(factory.factory.constructor.name).toBe('DefaultFactory');
        });

        it('should change the factory', () => {
            factory.set(testFactory);

            expect(factory.factory.constructor.name).toBe('TestFactory');
        });

        it('should reset the factory', () => {
            factory.set(testFactory);
            factory.reset();

            expect(factory.factory.constructor.name).toBe('DefaultFactory');
        });

        it('should set a factory object', () => {
            factory.set({
                createShape: () => { },
                createConnection: () => { },
                createLabel: () => { },
            });

            expect(factory.factory.constructor.name).not.toBe('DefaultFactory');
            expect(typeof factory.factory.createShape).toBe('function');
            expect(typeof factory.factory.createConnection).toBe('function');
            expect(typeof factory.factory.createLabel).toBe('function');
        });

        it('should throw an error on missing factory methods', () => {
            expect(() => factory.set(
                { createShape: () => { }, createConnection: () => { } })
            ).toThrowError();

            expect(() => factory.set(
                { createShape: () => { }, createLabel: () => { } })
            ).toThrowError();

            expect(() => factory.set(
                { createConnection: () => { }, createLabel: () => { } })
            ).toThrowError();
        });

        it('should create a shape', () => {
            const shape = factory.createShape();

            expect(shape.id).toBeDefined();
            expect(shape.type).toBe('shape');
            expect(shape.x).toBeDefined();
            expect(shape.y).toBeDefined();
            expect(shape.width).toBeDefined();
            expect(shape.height).toBeDefined();
        });

        it('should create a connection', () => {
            const connection = factory.createConnection();

            expect(connection.id).toBeDefined();
            expect(connection.type).toBe('connection');
            expect(connection.waypoints).toBeDefined();
        });

        it('should create a label', () => {
            const label = factory.createLabel();

            expect(label.id).toBeDefined();
            expect(label.type).toBe('label');
            expect(label.text).toBeDefined();
        });

    });

    describe('Behavior', () => {
        let eventBus;

        beforeEach(() => eventBus = diagram.get('eventBus'));

        it('should set the factory on event', () => {
            eventBus.fire('factory.set', { factory: testFactory });

            expect(factory.factory.constructor.name).toBe('TestFactory');
        });

        it('should reset the factory on event', () => {
            factory.set(testFactory);
            eventBus.fire('factory.reset');

            expect(factory.factory.constructor.name).toBe('DefaultFactory');
        });

    });

});
