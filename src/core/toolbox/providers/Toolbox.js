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
        this.start = { x: 0, y: 0 };
        this.snapped = { };
        this.mouseDown = false;
        this.mouseEvent = { };
        this.pos = { x: 0, y: 0 };

        this.mouseDownListener = null;
        this.mouseMoveListener = null;
        this.mouseUpListener = null;
    }

    bindListeners () {
        this.mouseDownListener = this.onMouseDown.bind(this);
        this.mouseMoveListener = this.onMouseMove.bind(this);
        this.mouseUpListener = this.onMouseUp.bind(this);
        event.bind(document, 'mousedown', this.mouseDownListener, true);
        event.bind(document, 'mousemove', this.mouseMoveListener, true);
        event.bind(document, 'mouseup', this.mouseUpListener, true);
    }

    unbindListeners () {
        event.unbind(document, 'mousedown', this.mouseDownListener, true);
        event.unbind(document, 'mousemove', this.mouseMoveListener, true);
        event.unbind(document, 'mouseup', this.mouseUpListener, true);
        this.mouseDownListener = null;
        this.mouseMoveListener = null;
        this.mouseUpListener = null;
    }

    setDefaultTool (name) {
        this.defaultTool = name;
    }

    registerTool (name, tool) {
        this.tools[name] = tool;
        this.tools[name].type = name;
    }

    activate (name, context = {}) {
        if (this.activeTool) {
            this.activeTool.onDisable(context);
        }

        this.previousTool = this.activeTool;
        this.activeTool = this.tools[name];

        if (!this.activeTool) {
            return null;
        }

        this.activeContext = context;
        Object.assign(this.mouseEvent, context, {
            tool: this.activeTool,
            previousTool: this.previousTool,
        });
        this.eventBus.fire('toolbox.update', context);

        if (this.activeTool) {
            this.activeTool.onEnable(this.mouseEvent);
        }
        return this.activeTool;
    }

    activateDefault () {
        this.mouseDown = false;
        this.mouseEvent = { };

        this.activate(this.defaultTool);
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

        this.start = { };
        this.start.hover = this.hover;
        const point = this.toLocal({ x: event.clientX, y: event.clientY });
        this.start.x = point.x;
        this.start.y = point.y;
        this.snapped = { };
        this.mouseDown = true;
        this.mouseEvent = this.createMouseEvent(event);

        this.activeTool.onMouseDown(this.mouseEvent);
    }

    onMouseUp (event) {
        if (!this.activeTool || !this.mouseDown) return;

        this.mouseDown = false;
        this.mouseEvent = this.createMouseEvent(event);

        this.activeTool.onMouseUp(this.mouseEvent);
    }

    onMouseMove (event) {
        if (!this.activeTool) return;

        this.mouseEvent = this.createMouseEvent(event);

        this.activeTool.onMouseMove(this.mouseEvent);
    }

    onHover (event) {
        if (!this.activeTool) return;

        // TODO: add mouseEvent to hover and out events
        // const mouseEvent = this.createMouseEvent(event);
        this.activeTool.onHover(event);
    }

    onOut (event) {
        if (!this.activeTool) return;

        // const mouseEvent = this.createMouseEvent(event);
        // mouseEvent.hover = event.element;
        this.activeTool.onOut(event);
    }

    onDoubleClick (event) {
        if (!this.activeTool) return;

        if (!this.hover) {
            this.hover = event.element;
            this.hoverGfx = event.gfx;
        }
        const originalEvent = event.originalEvent || this.mouseEvent;
        this.mouseEvent = this.createMouseEvent(originalEvent);
        this.activeTool.onDoubleClick(this.mouseEvent);
    }

    createMouseEvent (event) {
        const payload = this.toLocal({ x: event.clientX, y: event.clientY });
        payload.originalEvent = event;
        payload.hover = this.hover;
        payload.isOnCanvas = this.isOnCanvas(event);
        payload.hoverGfx = this.hoverGfx;
        payload.context = this.activeContext;
        payload.mouseDown = this.mouseDown;
        payload.root = this.isRootElement(this.hover);
        payload.tx = event.clientX - this.pos.x;
        payload.ty = event.clientY - this.pos.y;
        this.pos = { x: event.clientX, y: event.clientY };

        this.eventBus.fire('snapping.snap', payload);

        if (this.start) {
            payload.sx = this.start.x;
            payload.sy = this.start.y;
            payload.x = this.snapped.x || payload.x;
            payload.y = this.snapped.y || payload.y;
            payload.dx = payload.x - this.start.x;
            payload.dy = payload.y - this.start.y;
            payload.hoverStart = this.start.hover;
            payload.rootStart = this.isRootElement(this.start.hover);
        }

        return this.eventBus.createEvent(payload);
    }

    toLocal (position) {
        const viewbox = this.canvas.viewbox();
        const clientRect = this.canvas._container.getBoundingClientRect();

        return {
            x: viewbox.x + (position.x - clientRect.left) / viewbox.scale,
            y: viewbox.y + (position.y - clientRect.top) / viewbox.scale,
        };
    }

    isOnCanvas (event) {
        return !!event.hover;
    }

    isRootElement (element) {
        return element && element.id === this.canvas._rootElement.id;
    }

}
