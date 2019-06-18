import HandModule from '../../../src/features/hand';
import { Tester } from '../../Tester';


describe('modules/hand - Hand', () => {
    let diagram;
    let hand;
    let canvas;


    beforeEach(() => diagram = new Tester({ modules: [ HandModule ] }));

    beforeEach(() => hand = diagram.get('hand'));

    beforeEach(() => canvas = diagram.get('canvas'));

    it('should be defined', () => {
        expect(hand).toBeDefined();
    });

    describe('Provider', () => {
        it('should move the canvas absolute', () => {
            let bbox;

            hand.moveTo(-20, -15);
            bbox = canvas.viewbox();

            expect(bbox.x).toBe(20);
            expect(bbox.y).toBe(15);

            hand.moveTo(30, 45);
            bbox = canvas.viewbox();

            expect(bbox.x).toBe(-30);
            expect(bbox.y).toBe(-45);
        });

        it('should move the canvas relative', () => {
            let bbox;

            hand.moveBy(-20, -15);
            bbox = canvas.viewbox();

            expect(bbox.x).toBe(20);
            expect(bbox.y).toBe(15);

            hand.moveBy(30, 45);
            bbox = canvas.viewbox();

            expect(bbox.x).toBe(-10);
            expect(bbox.y).toBe(-30);
        });

        it('should not move', () => {
            hand.moveTo(30, 15);

            hand.moveBy(0, 0);
            const bbox = canvas.viewbox();

            expect(bbox.x).toBe(-30);
            expect(bbox.y).toBe(-15);
        });
    });

    describe('Behaviors', () => {
        let eventBus;

        beforeEach(() => eventBus = diagram.get('eventBus'));

        it('should move the canvas', () => {
            let bbox;

            eventBus.fire('hand.move', { tx: -20, ty: -15 });
            bbox = canvas.viewbox();

            expect(bbox.x).toBe(20);
            expect(bbox.y).toBe(15);

            eventBus.fire('hand.move', { tx: 30, ty: 45 });
            bbox = canvas.viewbox();

            expect(bbox.x).toBe(-10);
            expect(bbox.y).toBe(-30);
        });
    });

    describe('Tools', () => {
        let toolbox;

        beforeEach(() => toolbox = diagram.get('toolbox'));

        it('should activate hand tool', () => {
            toolbox.activate('hand');

            expect(toolbox.activeTool.constructor.name).toEqual('HandTool');
        });

        it('should set the cursor to grab after activate', () => {
            toolbox.activate('hand');

            expect(document.body.style.cursor).toBe('grab');
        });

        it('should unset the cursor after disable', () => {
            toolbox.activate('hand');
            toolbox.activate('pointer');

            expect(document.body.style.cursor).toBe('default');
        });

        it('should set the cursor to grabbing after mouseDown', () => {
            toolbox.activate('hand');

            toolbox.onMouseDown();

            expect(document.body.style.cursor).toBe('grabbing');
        });

        it('should set the cursor to grab after mouseUp', () => {
            toolbox.activate('hand');

            toolbox.onMouseDown();
            toolbox.onMouseUp();

            expect(document.body.style.cursor).toBe('grab');
        });
    });

});
