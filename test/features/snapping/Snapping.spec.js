import { mid } from 'diagram-js/lib/features/snapping/SnapUtil';
import SnappingModule from '../../../src/features/snapping';
import { Tester } from '../../Tester';


describe('modules/snapping - Snapping', () => {
    let diagram;
    let shape_1, shape_2;
    let snapping;
    let canvas;

    beforeEach(() => diagram = new Tester({ modules: [ SnappingModule ] }));

    beforeEach(() => snapping = diagram.get('snapping'));

    beforeEach(() => canvas = diagram.get('canvas'));

    beforeEach(() => diagram.invoke(function (elementFactory) {
        shape_1 = elementFactory.createShape({
            id: 'shape_1', x: 100, y: 200, width: 300, height: 400,
        });
        shape_2 = elementFactory.createShape({
            id: 'shape_2', x: 500, y: 200, width: 300, height: 400,
        });

        canvas.addShape(shape_1);
        canvas.addShape(shape_2);
    }));

    it('should be defined', () => {
        expect(snapping).toBeDefined();
    });

    describe('Provider', () => {

        it('should init snapContext', () => {
            snapping.init();
            expect(snapping.points.length).toBe(2);
        });

        it('should snap to mid', () => {
            snapping.init();

            const source = mid(shape_2);
            const snapped = snapping.snap(source);

            expect(snapped.x).toBe(650);
            expect(snapped.y).toBe(400);
        });

    });

    describe('Behavior', () => {
        let eventBus;

        beforeEach(() => eventBus = diagram.get('eventBus'));

        it('should snap', () => {
            const payload = {
                x: 1000,
                y: 200,
                context: {
                    shape: shape_1
                }
            };
            eventBus.fire('snapping.snap', payload);

            console.log(payload);
            expect(payload.snapped).toBeTruthy();
        })

    });

});
