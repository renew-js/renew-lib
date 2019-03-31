import ConnectModule from '../../../src/features/connect';
import { Tester } from '../../Tester';


describe('modules/connect - Connect', () => {
    let diagram;
    let connect;
    let canvas;

    beforeEach(() => {
        diagram = new Tester({ modules: [ ConnectModule ] });
        connect = diagram.get('connect');
        canvas = diagram.get('canvas');
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

});
