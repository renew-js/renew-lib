// import { create, append } from 'tiny-svg';
import PreviewModule from '../../../src/features/preview';
import { Tester } from '../../Tester';


describe('modules/preview - Preview', () => {
    let diagram;
    let shape_1, shape_2, connection_1;
    let preview;
    let canvas;

    beforeEach(() => diagram = new Tester({ modules: [ PreviewModule ] }));

    beforeEach(() => canvas = diagram.get('canvas'));

    beforeEach(() => preview = diagram.get('preview'));

    beforeEach(() => diagram.invoke(function (elementFactory) {
        shape_1 = elementFactory.createShape({
            id: 'shape_1', x: 100, y: 200, width: 300, height: 400,
        });
        shape_2 = elementFactory.createShape({
            id: 'shape_2', x: 500, y: 200, width: 300, height: 400,
        });
        connection_1 = elementFactory.createConnection({
            id: 'connection_1',
            waypoints: [ { x: 250, y: 400 }, { x: 650, y: 400 } ],
            source: shape_1,
            target: shape_2
        });

        canvas.addShape(shape_1);
        canvas.addShape(shape_2);
        canvas.addConnection(connection_1);
    }));

    it('should be defined', () => {
        expect(preview).toBeDefined();
    });

    describe('Provider', () => {

        it('should create shape visuals', () => {
            const visuals = preview.createVisuals(shape_1);
            const bbox = visuals.getBBox();

            expect(bbox.x).toBe(shape_1.x);
            expect(bbox.y).toBe(shape_1.y);
            expect(bbox.width).toBe(shape_1.width);
            expect(bbox.height).toBe(shape_1.height);
            expect(canvas.getDefaultLayer().childNodes.length).toBe(4);
        });

        it('should create connection visuals', () => {
            const visuals = preview.createVisuals(connection_1);
            const bbox = visuals.getBBox();

            expect(bbox.x).toBe(250);
            expect(bbox.y).toBe(400);
            expect(bbox.width).toBe(400);
            expect(bbox.height).toBe(0);
            expect(canvas.getDefaultLayer().childNodes.length).toBe(4);
        });

        it('should set the visuals', () => {
            const visuals = preview.createVisuals(shape_1);

            expect(preview.visuals).toBe(visuals);
            expect(canvas.getDefaultLayer().childNodes.length).toBe(4);
        });

        it('should clear the visuals', () => {
            preview.createVisuals(shape_1);

            expect(preview.visuals).toBeTruthy();
            expect(canvas.getDefaultLayer().childNodes.length).toBe(4);

            preview.clearVisuals();

            expect(preview.visuals).toBeFalsy();
            expect(canvas.getDefaultLayer().childNodes.length).toBe(3);
        });

        it('should not draw duplicate elements', () => {
            preview.createVisuals(shape_1);
            preview.createVisuals(shape_1);

            expect(canvas.getDefaultLayer().childNodes.length).toBe(4);
        });

    });

});
