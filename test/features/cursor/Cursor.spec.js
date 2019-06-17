import CursorModule from '../../../src/features/cursor';
import { Tester } from '../../Tester';


describe('modules/cursor - Cursor', () => {
    let diagram;
    let cursor;
    let canvas;

    beforeEach(() => {
        diagram = new Tester({ modules: [ CursorModule ] });
        cursor = diagram.get('cursor');
        canvas = diagram.get('canvas');
    });

    it('should be defined', () =>

        expect(cursor).toBeDefined());

    describe('Provider', () => {

        it('should set the cursor', () => {
            cursor.set('pointer');

            expect(document.body.style.cursor).toBe('pointer');
        });

        it('should unset the cursor', () => {
            cursor.set('pointer');
            cursor.unset();

            expect(document.body.style.cursor).toBe('default');
        });

    });

    describe('Behavior', () => {
        let eventBus;

        beforeEach(() => eventBus = diagram.get('eventBus'));

        it('should set the cursor', () => {
            eventBus.fire('cursor.set', { cursor: 'pointer' });

            expect(document.body.style.cursor).toBe('pointer');
        });

        it('should unset the cursor', () => {
            cursor.set('pointer');
            eventBus.fire('cursor.unset');

            expect(document.body.style.cursor).toBe('default');
        });

        it('should set the cursor to pointer', () => {
            eventBus.fire('cursor.set.pointer');

            expect(document.body.style.cursor).toBe('pointer');
        });

        it('should set the cursor to grab', () => {
            eventBus.fire('cursor.set.grab');

            expect(document.body.style.cursor).toBe('grab');
        });

        it('should set the cursor to grabbing', () => {
            eventBus.fire('cursor.set.grabbing');

            expect(document.body.style.cursor).toBe('grabbing');
        });

        it('should set the cursor to nwse-resize', () => {
            eventBus.fire('cursor.set.nwse');

            expect(document.body.style.cursor).toBe('nwse-resize');
        });

        it('should set the cursor to nesw-resize', () => {
            eventBus.fire('cursor.set.nesw');

            expect(document.body.style.cursor).toBe('nesw-resize');
        });

    });

});
