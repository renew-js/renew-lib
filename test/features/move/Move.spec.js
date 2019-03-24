import MoveModule from '../../../src/features/move';
import { Tester } from '../../Tester';


describe('modules/move - Move', () => {
    let diagram;
    let shape_1, shape_2;
    let move;

    beforeEach(() => diagram = new Tester({ modules: [ MoveModule ] }));

    beforeEach(() => move = diagram.get('move'));

    beforeEach(() => diagram.invoke(function (canvas, elementFactory) {
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
        expect(move).toBeDefined();
    });

    describe('Provider', () => {

        it('should move a shape to an absolute position', () => {
            move.elements(shape_1).to(150, 160);

            expect(shape_1.x).toEqual(150);
            expect(shape_1.y).toEqual(160);
        });

        it('should move multiple shape to an absolute position', () => {
            move.elements([ shape_1, shape_2 ]).to(150, 160);

            expect(shape_1.x).toEqual(150);
            expect(shape_1.y).toEqual(160);
            expect(shape_2.x).toEqual(150);
            expect(shape_2.y).toEqual(160);
        });

        it('should move a shape by a relative value', () => {
            move.elements(shape_1).by(10, 15);

            expect(shape_1.x).toEqual(110);
            expect(shape_1.y).toEqual(215);
        });

        it('should move multiple shape by a relative value', () => {
            move.elements([ shape_1, shape_2 ]).by(10, 15);

            expect(shape_1.x).toEqual(110);
            expect(shape_1.y).toEqual(215);
            expect(shape_2.x).toEqual(510);
            expect(shape_2.y).toEqual(215);
        });
    });

    describe('Behavior', () => {
        let eventBus;

        beforeEach(() => eventBus = diagram.get('eventBus'));

        it('should move a shape to an absolute position', () => {
            eventBus.fire('move.elements', {
                elements: shape_1, x: 150, y: 160
            });

            expect(shape_1.x).toEqual(150);
            expect(shape_1.y).toEqual(160);
        });

        it('should move multiple shape to an absolute position', () => {
            eventBus.fire('move.elements', {
                elements: [ shape_1, shape_2 ], x: 150, y: 160
            });

            expect(shape_1.x).toEqual(150);
            expect(shape_1.y).toEqual(160);
            expect(shape_2.x).toEqual(150);
            expect(shape_2.y).toEqual(160);
        });

        it('should move a shape by a relative value', () => {
            eventBus.fire('move.elements', {
                elements: shape_1, dx: 10, dy: 15
            });

            expect(shape_1.x).toEqual(110);
            expect(shape_1.y).toEqual(215);
        });

        it('should move multiple shape by a relative value', () => {
            eventBus.fire('move.elements', {
                elements: [ shape_1, shape_2 ], dx: 10, dy: 15
            });

            expect(shape_1.x).toEqual(110);
            expect(shape_1.y).toEqual(215);
            expect(shape_2.x).toEqual(510);
            expect(shape_2.y).toEqual(215);
        });

        it('should not move elements', () => {
            eventBus.fire('move.elements', {
                elements: [ shape_1, shape_2 ], dx: 0, dy: 0, x: 10, y: 20
            });

            expect(shape_1.x).toEqual(100);
            expect(shape_1.y).toEqual(200);
            expect(shape_2.x).toEqual(500);
            expect(shape_2.y).toEqual(200);
        });

    });

});
