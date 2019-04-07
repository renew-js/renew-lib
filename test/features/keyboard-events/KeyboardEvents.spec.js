import KeyboardEventsModule from '../../../src/features/keyboard-events';
import { Tester } from '../../Tester';


describe('modules/keyboard-events - KeyboardEvents', () => {
    let diagram;
    let keyboardEvents;
    let eventBus;

    beforeEach(() => {
        diagram = new Tester({ modules: [ KeyboardEventsModule ] });
        keyboardEvents = diagram.get('keyboardEvents');
        eventBus = diagram.get('eventBus');
    });

    it('should be defined', () => {
        expect(keyboardEvents).toBeDefined();
    });

    describe('Provider', () => {
        let fired;

        beforeEach(() => {
            keyboardEvents.bindListeners();
            fired = false;
        });

        it('it should fire keypress.start on key down', () => {
            eventBus.on('keypress.start', (context) => {
                fired = true;
            });

            const event = new KeyboardEvent('keydown');
            document.dispatchEvent(event);

            expect(fired).toBe(true);
        });

        it('it should fire keypress.end on key up', () => {
            eventBus.on('keypress.end', (context) => {
                fired = true;
            });

            const event = new KeyboardEvent('keyup');
            document.dispatchEvent(event);

            expect(fired).toBe(true);
        });

        it('it should not fire keypress.start if default was prevented', () => {
            eventBus.on('keypress.start', (context) => {
                fired = true;
            });

            const event = new KeyboardEvent('keydown');
            event.preventDefault();
            document.dispatchEvent(event);

            expect(fired).toBe(true);
        });

    });

    describe('Behavior', () => {

        it('should bind dom events after attach', () => {
            eventBus.fire('attach.end');

            expect(keyboardEvents.keyDownListener).not.toBe(null);
            expect(keyboardEvents.keyUpListener).not.toBe(null);
        });

        it('should unbind dom events before detach', () => {
            eventBus.fire('detach.start');

            expect(keyboardEvents.keyDownListener).toBe(null);
            expect(keyboardEvents.keyUpListener).toBe(null);
        });

    });

});
