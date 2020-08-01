import { Tester } from '../../Tester';
import ZoomModule from '../../../src/features/zoom';


describe('modules/zoom - Zoom', () => {
    let diagram;
    let zoom;
    let canvas;

    beforeEach(() => {
        diagram = new Tester({ modules: [ ZoomModule ] });
        zoom = diagram.get('zoom');
        canvas = diagram.get('canvas');
    });

    it('should be defined', () => {
        expect(zoom).toBeDefined();
    });

    describe('Provider', () => {

        it('should zoom in', function () {
            zoom.in();

            expect(canvas.getCurrentScale()).toBe(1.1);
        });

        it('should zoom in by 0.2', function () {
            zoom.in(0.2);

            expect(canvas.getCurrentScale()).toBe(1.2);
        });

        it('should zoom out', function () {
            zoom.out();

            expect(canvas.getCurrentScale()).toBe(0.9);
        });

        it('should zoom out by 0.2', function () {
            zoom.out(0.2);

            expect(canvas.getCurrentScale()).toBe(0.8);
        });

        it('should reset the zoom factor', function () {
            zoom.out(0.4);

            expect(canvas.getCurrentScale()).toBe(0.6);

            zoom.reset();

            expect(canvas.getCurrentScale()).toBe(1);
        });

    });

    describe('Behavior', () => {
        let eventBus;

        beforeEach(() => {
            eventBus = diagram.get('eventBus');
        });

        it('should zoom in on zoom.in', function () {
            eventBus.fire('zoom.in');

            expect(canvas.getCurrentScale()).toBe(1.1);
        });

        it('should zoom in on zoom.in by 0.2', function () {
            eventBus.fire('zoom.in', { gap: 0.2 });

            expect(canvas.getCurrentScale()).toBe(1.2);
        });

        it('should zoom out on zoom.out', function () {
            eventBus.fire('zoom.out');

            expect(canvas.getCurrentScale()).toBe(0.9);
        });

        it('should zoom out on zoom.out by 0.2', function () {
            eventBus.fire('zoom.out', { gap: 0.2 });

            expect(canvas.getCurrentScale()).toBe(0.8);
        });

        it('should reset the room factor', function () {
            zoom.in(0.2);

            expect(canvas.getCurrentScale()).toBe(1.2);


            eventBus.fire('zoom.reset');

            expect(canvas.getCurrentScale()).toBe(1);
        });

    });

});
