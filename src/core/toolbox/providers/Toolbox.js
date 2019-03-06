import { toPoint } from 'diagram-js/lib/util/Event';
import { event } from 'min-dom';


export class Toolbox {

    constructor (eventBus) {
        this.eventBus = eventBus;
        this.activeTool = null;
        this.hover = null;
        this.hoverGfx = null;

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
        this.eventBus.fire(
            'tool.' + this.activeTool + '.onMouseDown',
            this.createMouseEvent(event)
        );
    }

    onMouseUp (event) {
        if (!this.activeTool) return;
        this.eventBus.fire(
            'tool.' + this.activeTool + '.onMouseUp',
            this.createMouseEvent(event)
        );
    }

    onMouseMove (event) {
        if (!this.activeTool) return;
        this.eventBus.fire(
            'tool.' + this.activeTool + '.onMouseMove',
            this.createMouseEvent(event)
        );
    }

    createMouseEvent (event) {
        return this.eventBus.createEvent({
            originalEvent: event,
            x: event.layerX,
            y: event.layerY,
            hover: this.hover,
            hoverGfx: this.hoverGfx
        });
    }

}
