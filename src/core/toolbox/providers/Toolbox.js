import { event } from 'min-dom';


export class Toolbox {

    constructor (eventBus, canvas) {
        this.eventBus = eventBus;
        this.canvas = canvas;

        this.tools = { };
        this.activeTool = null;
        this.defaultTool = null;
        this.previousTool = null;
        this.activeContext = null;

        this.hover = null;
        this.hoverGfx = null;
        this.start = null;

        event.bind(document, 'mousedown', this.onMouseDown.bind(this), true);
        event.bind(document, 'mousemove', this.onMouseMove.bind(this), true);
        event.bind(document, 'mouseup', this.onMouseUp.bind(this), true);
    }

    setDefaultTool (name) {
        this.defaultTool = name;
    }

    registerTool (name, tool) {
        this.tools[name] = tool;
        this.tools[name].type = name;
    }

    activate (tool, context = {}) {
        if (this.activeTool) {
            this.activeTool.onDisable(context);
        }

        this.previousTool = this.activeTool;
        this.activeTool = this.tools[tool];
        this.activeContext = context;
        Object.assign(context, {
            tool: this.activeTool,
            previousTool: this.previousTool
        });
        this.eventBus.fire('toolbox.update', context);

        if (this.activeTool) {
            this.activeTool.onEnable(context);
        }
    }

    activatePrevious (context) {
        if (this.previousTool) {
            this.activate(this.previousTool.type, context);
        } else {
            this.activate(this.defaultTool);
        }
    }

    onMouseDown (event) {
        if (!this.activeTool) return;
        this.start = this.toLocal({ x: event.clientX, y: event.clientY });
        this.start.hover = this.hover;
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
        const payload = this.toLocal({ x: event.clientX, y: event.clientY });
        payload.originalEvent = event;
        payload.hover = this.hover;
        payload.hoverGfx = this.hoverGfx;
        payload.context = this.activeContext;

        if (this.start) {
            payload.sx = this.start.x;
            payload.sy = this.start.y;
            payload.dx = payload.x - this.start.x;
            payload.dy = payload.y - this.start.y;
            payload.hoverStart = this.start.hover;
        }

        return this.eventBus.createEvent(payload);
    }

    toLocal (position) {
        const viewbox = this.canvas.viewbox();
        const clientRect = this.canvas._container.getBoundingClientRect();

        return {
            x: viewbox.x + (position.x - clientRect.left) / viewbox.scale,
            y: viewbox.y + (position.y - clientRect.top) / viewbox.scale
        };
    }

}
