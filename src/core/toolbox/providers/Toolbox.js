import { event } from 'min-dom';


export class Toolbox {

    constructor (eventBus) {
        this.eventBus = eventBus;
        this.activeTool = null;
        this.previousTool = null;
        this.hover = null;
        this.hoverGfx = null;
        this.start = null;

        event.bind(document, 'mousedown', this.onMouseDown.bind(this), true);
        event.bind(document, 'mousemove', this.onMouseMove.bind(this), true);
        event.bind(document, 'mouseup', this.onMouseUp.bind(this), true);
    }

    activate (tool, context = {}) {
        this.activeTool.onDisable(context);

        this.previousTool = this.activeTool;
        this.activeTool = tool;
        Object.assign(context, { tool: tool, previousTool: this.previousTool });

        this.eventBus.fire('toolbox.update', context);

        if (!this.activeTool) return;
        this.activeTool.onEnable(context);
    }

    activatePrevious (context) {
        this.activate(this.previousTool, context);
    }

    onMouseDown (event) {
        if (!this.activeTool) return;
        this.start = { x: event.layerX, y: event.layerY, hover: this.hover };
        this.activeTool.onMouseDown(this.createMouseEvent(event));
    }

    onMouseUp (event) {
        if (!this.activeTool) return;
        this.activeTool.onMouseUp(this.createMouseEvent(event));
        this.start = null;
    }

    onMouseMove (event) {
        if (!this.activeTool) return;
        this.activeTool.onMouseMove(this.createMouseEvent(event));
    }

    createMouseEvent (event) {
        let payload = {
            originalEvent: event,
            x: event.layerX,
            y: event.layerY,
            hover: this.hover,
            hoverGfx: this.hoverGfx
        };

        if (this.start) {
            Object.assign(payload, {
                sx: this.start.x,
                sy: this.start.y,
                dx: event.layerX - this.start.x,
                dy: event.layerY - this.start.y,
                hoverStart: this.start.hover,
            });
        }

        return this.eventBus.createEvent(payload);
    }

}
