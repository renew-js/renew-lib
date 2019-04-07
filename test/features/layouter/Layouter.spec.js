import LayouterModule from '../../../src/features/layouter';
import { Tester } from '../../Tester';


describe('modules/layouter - Layouter', () => {
    let diagram;
    let layouter;
    let elementFactory;
    let canvas;
    let shape1;
    let shape2;
    let connection1;

    beforeEach(() => {
        diagram = new Tester({ modules: [ LayouterModule ] });
        layouter = diagram.get('layouter');
        elementFactory = diagram.get('elementFactory');
        canvas = diagram.get('canvas');

        shape1 = elementFactory.createShape({
            id: 'shape1', x: 100, y: 200, width: 300, height: 400,
        });
        shape2 = elementFactory.createShape({
            id: 'shape2', x: 500, y: 200, width: 300, height: 400,
        });

        canvas.addShape(shape1);
        canvas.addShape(shape2);
    });

    it('should be defined', () => {
        expect(layouter).toBeDefined();
    });

    describe('Provider', () => {

        it('should layout a connection', () => {
            const connection1 = elementFactory.createConnection({
                source: shape1, target: shape2,
            });

            connection1.waypoints = layouter.layoutConnection(connection1);

            expect(connection1.waypoints[0].x).toBe(250);
            expect(connection1.waypoints[0].y).toBe(400);
            expect(connection1.waypoints[1].x).toBe(650);
            expect(connection1.waypoints[1].y).toBe(400);
        });

    });

});
