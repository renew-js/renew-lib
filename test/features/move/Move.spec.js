import MoveModule from '../../../src/features/move';
import { Tester } from '../../Tester';


describe('modules/move - Move', () => {
    let diagram;
    let shape1;
    let shape2;
    let move;

    beforeEach(() => diagram = new Tester({ modules: [ MoveModule ] }));

    beforeEach(() => move = diagram.get('move'));

    beforeEach(() => diagram.invoke(function (canvas, elementFactory) {
        shape1 = elementFactory.createShape({
            id: 'shape1', x: 100, y: 200, width: 300, height: 400,
        });
        shape2 = elementFactory.createShape({
            id: 'shape2', x: 500, y: 200, width: 300, height: 400,
        });

        canvas.addShape(shape1);
        canvas.addShape(shape2);
    }));

    it('should be defined', () => {
        expect(move).toBeDefined();
    });

    describe('Provider', () => {

        it('should move a shape to an absolute position', () => {
            move.elements(shape1).to(150, 160);

            expect(shape1.x).toEqual(150);
            expect(shape1.y).toEqual(160);
        });

        it('should move multiple shape to an absolute position', () => {
            move.elements([ shape1, shape2 ]).to(150, 160);

            expect(shape1.x).toEqual(150);
            expect(shape1.y).toEqual(160);
            expect(shape2.x).toEqual(150);
            expect(shape2.y).toEqual(160);
        });

        it('should move a shape by a relative value', () => {
            move.elements(shape1).by(10, 15);

            expect(shape1.x).toEqual(110);
            expect(shape1.y).toEqual(215);
        });

        it('should move multiple shape by a relative value', () => {
            move.elements([ shape1, shape2 ]).by(10, 15);

            expect(shape1.x).toEqual(110);
            expect(shape1.y).toEqual(215);
            expect(shape2.x).toEqual(510);
            expect(shape2.y).toEqual(215);
        });
    });

    describe('Behavior', () => {
        let eventBus;

        beforeEach(() => eventBus = diagram.get('eventBus'));

        it('should move a shape to an absolute position', () => {
            eventBus.fire('move.elements.to', {
                elements: shape1, x: 150, y: 160,
            });

            expect(shape1.x).toEqual(150);
            expect(shape1.y).toEqual(160);
        });

        it('should move multiple shape to an absolute position', () => {
            eventBus.fire('move.elements.to', {
                elements: [ shape1, shape2 ], x: 150, y: 160,
            });

            expect(shape1.x).toEqual(150);
            expect(shape1.y).toEqual(160);
            expect(shape2.x).toEqual(150);
            expect(shape2.y).toEqual(160);
        });

        it('should move a shape by a relative value', () => {
            eventBus.fire('move.elements.by', {
                elements: shape1, dx: 10, dy: 15,
            });

            expect(shape1.x).toEqual(110);
            expect(shape1.y).toEqual(215);
        });

        it('should move multiple shape by a relative value', () => {
            eventBus.fire('move.elements.by', {
                elements: [ shape1, shape2 ], dx: 10, dy: 15,
            });

            expect(shape1.x).toEqual(110);
            expect(shape1.y).toEqual(215);
            expect(shape2.x).toEqual(510);
            expect(shape2.y).toEqual(215);
        });

        it('should not move elements', () => {
            eventBus.fire('move.elements', {
                elements: [ shape1, shape2 ], dx: 0, dy: 0, x: 10, y: 20,
            });

            expect(shape1.x).toEqual(100);
            expect(shape1.y).toEqual(200);
            expect(shape2.x).toEqual(500);
            expect(shape2.y).toEqual(200);
        });

    });

});
