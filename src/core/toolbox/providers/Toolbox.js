import { event } from 'min-dom';


export class Toolbox {

    constructor (eventBus) {
        this.eventBus = eventBus;
        this.activeTool = null;

        eventBus.on('element.hover', (event) => { eventBus.fire('hoooooooooooooo');console.log('hover', event);});

        event.bind(document, 'mousedown', this.onMouseDown.bind(this), true);
        event.bind(document, 'mousemove', this.onMouseMove.bind(this), true);
        event.bind(document, 'mouseup', this.onMouseUp.bind(this), true);
    }

    activate (name, context) {
        this.eventBus.fire('tool.' + this.activeTool + '.disable', context);
        this.activeTool = name;
        if (!this.activeTool) return;
        this.eventBus.fire('tool.' + this.activeTool + '.enable', context);
    }

    onMouseDown (event) {
        if (!this.activeTool) return;
        this.eventBus.fire('tool.' + this.activeTool + '.onMouseDown', {
            event: event,
        });
    }

    onMouseUp (event) {
        if (!this.activeTool) return;
        this.eventBus.fire('tool.' + this.activeTool + '.onMouseUp', {
            event: event,
        });
    }

    onMouseMove (event) {
        if (!this.activeTool) return;
        this.eventBus.fire('tool.' + this.activeTool + '.onMouseMove', {
            event: event,
        });
    }

}

/*
if (isTouch) {
domEvent.bind(document, 'touchstart', trapTouch, true);
domEvent.bind(document, 'touchcancel', cancel, true);
domEvent.bind(document, 'touchmove', move, true);
domEvent.bind(document, 'touchend', end, true);
} else {
// assume we use the mouse to interact per default
domEvent.bind(document, 'mousemove', move);

// prevent default browser drag and text selection behavior
domEvent.bind(document, 'dragstart', preventDefault);
domEvent.bind(document, 'selectstart', preventDefault);

domEvent.bind(document, 'mousedown', endDrag, true);
domEvent.bind(document, 'mouseup', endDrag, true);
}

domEvent.bind(document, 'keyup', checkCancel);
 */
