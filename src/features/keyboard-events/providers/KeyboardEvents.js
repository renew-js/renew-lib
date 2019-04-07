import { event } from 'min-dom';


export class KeyboardEvents {

    constructor (eventBus) {
        this.eventBus = eventBus;

        this.keyDown = null;

        this.keyDownListener = null;
        this.keyUpListener = null;
    }

    bindListeners () {
        this.keyDownListener = this.onKeyDown.bind(this);
        this.keyUpListener = this.onKeyUp.bind(this);

        event.bind(document, 'keydown', this.keyDownListener, true);
        event.bind(document, 'keyup', this.keyUpListener, true);
    }

    unbindListeners () {
        event.unbind(document, 'keydown', this.keyDownListener, true);
        event.unbind(document, 'keyup', this.keyUpListener, true);

        this.keyDownListener = null;
        this.keyUpListener = null;
    }

    onKeyDown (event) {
        if (event.defaultPrevented) return;

        this.keyDown = event;
        this.eventBus.fire('keypress.start', { originalEvent: event });
    }

    onKeyUp (event) {
        if (!this.keyDown) return;

        this.eventBus.fire('keypress.end', { originalEvent: event });
        this.keyDown = null;
    }

}
