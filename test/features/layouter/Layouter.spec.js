import LayouterModule from '../../../src/features/layouter';
import { Tester } from '../../Tester';


describe('modules/layouter - Layouter', () => {
    let diagram;
    let layouter;
    let defaultFactory;
    let canvas;

    beforeEach(() => {
        diagram = new Tester({ modules: [ LayouterModule ] });

        layouter = diagram.get('layouter');
        defaultFactory = diagram.get('defaultFactory');
        canvas = diagram.get('canvas');
    });

    it('should be defined', () => {
        expect(layouter).toBeDefined();
    });

    describe('Provider', () => {

        it('should layout a connection', () => {
            const shape1 = defaultFactory.createShape({
                id: 'shape1',
                x: 100,
                y: 200,
            });
            const shape2 = defaultFactory.createShape({
                id: 'shape2',
                x: 200,
                y: 300,
            });

            canvas.addShape(shape1);
            canvas.addShape(shape2);

            const connection1 = defaultFactory.createConnection({
                source: shape1, target: shape2,
            });

            connection1.waypoints = layouter.layoutConnection(connection1);

            expect(connection1.waypoints[0].x).toBe(139);
            expect(connection1.waypoints[0].y).toBe(231);
            expect(connection1.waypoints[1].x).toBe(209);
            expect(connection1.waypoints[1].y).toBe(301);
        });

    });

});
