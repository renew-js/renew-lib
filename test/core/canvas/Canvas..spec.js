import { Tester } from '../../Tester';


describe('modules/canvas - Canvas', () => {
    let diagram;
    let canvas;

    beforeEach(() => {
        diagram = new Tester();
        canvas = diagram.get('canvas');
    });

    it('should be defined', () => {
        expect(canvas).toBeDefined();
    });

    describe('Provider', () => {

        it('should set initially the current zoom to 1', function () {
            expect(canvas.getCurrentScale()).toBe(1);
        });

        it('should change the current scale after zoom', function () {
            canvas.zoom(0.9);

            expect(canvas.getCurrentScale()).toBe(0.9);
        });

        it('should get the element registry', function () {
            expect(canvas.getElementRegistry()).toBe(canvas._elementRegistry);
        });

        it('should get the graphics factory', function () {
            expect(canvas.getGraphicsFactory()).toBe(canvas._graphicsFactory);
        });

        it('should not contain the root element', function () {
            const elements = canvas.getElements();
            const elementIds = elements.map((element) => element.id);
            expect(elementIds).not.toContain('__implicitroot');
        });

    });

});
