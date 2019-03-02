import BaseResize from 'diagram-js/lib/features/resize/Resize';

/**
 * Resize any shape and path relative to initial state
 * TODO: depending on modeling, dragging, rules
 */
export class Resize extends BaseResize {
    constructor (eventBus, rules, modeling, dragging) {
        super(eventBus, rules, modeling, dragging);
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
        const bounds = event.context.newBounds;
        const proportions = event.shape.body.proportions;

        if (!proportions) return;

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
            break;
        case 'polygon':
            const points = [];
            const proportionPoints = proportions.points.split(' ').map(parseFloat);
            for (let i=0; i<proportionPoints.length; i+=2) {
                points.push(proportionPoints[i] * bounds.width);
                points.push(proportionPoints[i+1] * bounds.height);
            }
            event.shape.body.attributes.points = points.join(' ');
        }
    }
}
