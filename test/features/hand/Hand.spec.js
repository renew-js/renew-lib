import HandModule from '../../../src/features/hand';
import { Tester } from '../../Tester';


describe('modules/hand - Hand', () => {
    let diagram;
    let hand;

    beforeEach(() => diagram = new Tester({ modules: [ HandModule ] }));

    beforeEach(() => hand = diagram.get('hand'));

    it('should be defined', () => {
        expect(hand).toBeDefined();
    });

    describe('Provider', () => {
        let canvas;

        beforeEach(() => canvas = diagram.get('canvas'));

        it('should move the canvas absolute', () => {
            let bbox;

            hand.moveTo(-20, -15);
            bbox = canvas.viewbox();

            expect(bbox.x).toBe(-20);
            expect(bbox.y).toBe(-15);

            hand.moveTo(30, 45);
            bbox = canvas.viewbox();

            expect(bbox.x).toBe(30);
            expect(bbox.y).toBe(45);
        });

        it('should move the canvas relative', () => {
            let bbox;

            hand.moveBy(-20, -15);
            bbox = canvas.viewbox();

            expect(bbox.x).toBe(-20);
            expect(bbox.y).toBe(-15);

            hand.moveBy(30, 45);
            bbox = canvas.viewbox();

            expect(bbox.x).toBe(10);
            expect(bbox.y).toBe(30);
        });
    });

    describe('Tools', () => {
        let toolbox;

        beforeEach(() => toolbox = diagram.get('toolbox'));

        it('should activate hand tool', () => {
            toolbox.activate('hand');
            expect(toolbox.activeTool.constructor.name).toEqual('HandTool');
        });
    });

});
