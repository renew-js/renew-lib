import MoveModule from '../../../src/features/move';
import { Tester } from '../../Tester';


describe('modules/move - Move', () => {
    let diagram;
    let shape_1, shape_2;

    beforeEach(() => diagram = new Tester({ modules: [ MoveModule, ] }));

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

    it('should be defined', () => diagram.invoke(function (move) {
        expect(move).toBeDefined();
    }));

    it('should move a shape to an absolute position', () => {
        diagram.invoke(function (move) {
            move.elements(shape_1).to(150, 160);
            expect(shape_1.x).toEqual(150);
            expect(shape_1.y).toEqual(160);
        })
    });

    it('should move multiple shape to an absolute position', () => {
        diagram.invoke(function (move) {
            move.elements([ shape_1, shape_2 ]).to(150, 160);
            expect(shape_1.x).toEqual(150);
            expect(shape_1.y).toEqual(160);
            expect(shape_2.x).toEqual(150);
            expect(shape_2.y).toEqual(160);
        })
    });

    it('should move a shape by a relative value', () => {
        diagram.invoke(function (move) {
            move.elements(shape_1).by(10, 15);
            expect(shape_1.x).toEqual(110);
            expect(shape_1.y).toEqual(215);
        })
    });

    it('should move multiple shape by a relative value', () => {
        diagram.invoke(function (move) {
            move.elements([ shape_1, shape_2 ]).by(10, 15);
            expect(shape_1.x).toEqual(110);
            expect(shape_1.y).toEqual(215);
            expect(shape_2.x).toEqual(510);
            expect(shape_2.y).toEqual(215);
        })
    });

});
