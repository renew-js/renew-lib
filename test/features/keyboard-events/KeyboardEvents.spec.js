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
        let keyDownFired;
        let keyUpFired;
        let onKeyDown;
        let onKeyUp;

        beforeEach(() => {
            keyboardEvents.bindListeners();
            keyDownFired = false;
            keyUpFired = false;
            onKeyDown = () => keyDownFired = true;
            onKeyUp = () => keyUpFired = true;
            eventBus.on('keypress.start', onKeyDown);
            eventBus.on('keypress.end', onKeyUp);
        });

        afterEach(() => {
            keyboardEvents.unbindListeners();
            eventBus.off('keypress.start', onKeyDown);
            eventBus.off('keypress.end', onKeyUp);
        });

        it('it should fire keypress.start on key down', () => {
            const event = new KeyboardEvent('keydown');
            document.dispatchEvent(event);

            expect(keyDownFired).toBe(true);
        });

        it('it should fire keypress.end on key up', () => {
            const event = new KeyboardEvent('keyup');
            document.dispatchEvent(event);

            expect(keyUpFired).toBe(true);
        });

        it('it should not fire keypress.start if default was prevented', () => {
            const event = new KeyboardEvent('keydown');
            event.preventDefault();
            event.stopPropagation();
            document.dispatchEvent(event);

            expect(keyDownFired).toBe(false);
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
