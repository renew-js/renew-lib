// import { create, append } from 'tiny-svg';
import PreviewModule from '../../../src/features/preview';
import CreateModule from '../../../src/features/create';
import { Tester } from '../../Tester';


describe('modules/preview - Preview', () => {
    let diagram;
    let shape1;
    let shape2;
    let connection1;
    let preview;
    let canvas;

    beforeEach(() => diagram = new Tester({ modules: [ PreviewModule ] }));

    beforeEach(() => canvas = diagram.get('canvas'));

    beforeEach(() => preview = diagram.get('preview'));

    beforeEach(() => diagram.invoke(function (elementFactory) {
        shape1 = elementFactory.createShape({
            id: 'shape1', x: 100, y: 200, width: 300, height: 400,
        });
        shape2 = elementFactory.createShape({
            id: 'shape2', x: 500, y: 200, width: 300, height: 400,
        });
        connection1 = elementFactory.createConnection({
            id: 'connection1',
            waypoints: [ { x: 250, y: 400 }, { x: 650, y: 400 } ],
            source: shape1,
            target: shape2,
        });

        canvas.addShape(shape1);
        canvas.addShape(shape2);
        canvas.addConnection(connection1);
    }));

    it('should be defined', () => {
        expect(preview).toBeDefined();
    });

    describe('Provider', () => {

        it('should create shape visuals', () => {
            const visuals = preview.createVisuals(shape1);
            const bbox = visuals.getBBox();

            expect(bbox.x).toBe(shape1.x);
            expect(bbox.y).toBe(shape1.y);
            expect(bbox.width).toBe(shape1.width);
            expect(bbox.height).toBe(shape1.height);
            expect(canvas.getDefaultLayer().childNodes.length).toBe(4);
        });

        it('should create connection visuals', () => {
            const visuals = preview.createVisuals(connection1);
            const bbox = visuals.getBBox();

            expect(bbox.x).toBe(250);
            expect(bbox.y).toBe(400);
            expect(bbox.width).toBe(400);
            expect(bbox.height).toBe(0);
            expect(canvas.getDefaultLayer().childNodes.length).toBe(4);
        });

        it('should set the visuals', () => {
            const visuals = preview.createVisuals(shape1);

            expect(preview.visuals).toBe(visuals);
            expect(canvas.getDefaultLayer().childNodes.length).toBe(4);
        });

        it('should clear the visuals', () => {
            preview.createVisuals(shape1);

            expect(preview.visuals).toBeTruthy();
            expect(canvas.getDefaultLayer().childNodes.length).toBe(4);

            preview.clearVisuals();

            expect(preview.visuals).toBeFalsy();
            expect(canvas.getDefaultLayer().childNodes.length).toBe(3);
        });

        it('should not draw duplicate elements', () => {
            preview.createVisuals(shape1);
            preview.createVisuals(shape1);

            expect(canvas.getDefaultLayer().childNodes.length).toBe(4);
        });

        it('should translate', () => {

        });

    });

    describe('Behavior', () => {
        let eventBus;

        beforeEach(() => eventBus = diagram.get('eventBus'));

        it('should init the preview', () => {
            eventBus.fire('preview.init', { element: shape1 });

            expect(preview.visuals.elements[0]).toBeDefined();
            expect(preview.visuals.elements[0].id).not.toBe(shape1.id);
            expect(preview.visuals.elements[0].x).toBe(shape1.x);
            expect(preview.visuals.elements[0].y).toBe(shape1.y);
        });

        it('should translate', () => {
            eventBus.fire('preview.init', { element: shape1 });
            eventBus.fire('preview.move', { dx: 15, dy: 20 });

            expect(preview.visuals.elements[0].x).toBe(shape1.x + 15);
            expect(preview.visuals.elements[0].y).toBe(shape1.y + 20);
        });
    });

    describe('Tool', () => {
        let toolbox;

        beforeEach(() => toolbox = diagram.get('toolbox'));

        describe('Create', () => {

            beforeEach(() => diagram.injector.loadModule(CreateModule));

            it('should be defined', () => {
                const create = diagram.get('create');
                expect(create).toBeDefined()
            });

        });

    });

});
