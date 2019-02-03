/**
 * Resize any shape and path relative to initial state
 */
export class MetaResize {
    constructor (eventBus) {
        this.eventBus = eventBus;

        this.init();
    }

    init () {
        this.eventBus.on('resize.start', this.onResizeStart.bind(this));
        this.eventBus.on('resize.move', this.onResizeMove.bind(this));
        this.eventBus.on('resize.end', 1501, this.onResizeEnd.bind(this));
    }

    onResizeStart (event) {
    }

    onResizeMove (event) {
    }

    onResizeEnd (event) {
        let bounds = event.context.newBounds;
        let proportions = event.shape.body.proportions;
        switch (event.shape.body.name) {
            case 'ellipse':
                event.shape.body.attributes.cx = proportions.cx * bounds.width;
                event.shape.body.attributes.cy = proportions.cy * bounds.height;
                event.shape.body.attributes.rx = proportions.rx * bounds.width;
                event.shape.body.attributes.ry = proportions.ry * bounds.height;
                break;
            case 'circle':
                event.shape.body.attributes.cx = proportions.cx * bounds.width;
                event.shape.body.attributes.cy = proportions.cy * bounds.height;
                event.shape.body.attributes.r = proportions.r * Math.min(bounds.width, bounds.height);
                break;
            case 'rect':
                event.shape.body.attributes.x = proportions.x * bounds.width;
                event.shape.body.attributes.y = proportions.y * bounds.height;
                event.shape.body.attributes.width = proportions.width * bounds.width;
                event.shape.body.attributes.height = proportions.height * bounds.height;
        }
    }
}
