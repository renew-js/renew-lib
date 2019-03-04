import { Behavior } from '../../../core/Behavior';

/**
 * Resize any shape and path relative to initial state
 */
export class ResizeBehavior extends Behavior {

    constructor (eventBus) {
        super();
        this.eventBus = eventBus;
    }

    start (event) { }

    move (event) { }

    end (event) {
        const bounds = event.context.newBounds;
        const proportions = event.shape.body.proportions;

        if (!proportions) return;

        let points;
        let proportionPoints;

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
                event.shape.body.attributes.r = proportions.r * Math.min(
                    bounds.width,
                    bounds.height
                );
                break;
            case 'rect':
                event.shape.body.attributes.x = proportions.x * bounds.width;
                event.shape.body.attributes.y = proportions.y * bounds.height;
                event.shape.body.attributes.width
                    = proportions.width * bounds.width;
                event.shape.body.attributes.height
                    = proportions.height * bounds.height;
                break;
            case 'polygon':
                points = [];
                proportionPoints = proportions.points.split(' ')
                    .map(parseFloat);
                for (let i=0; i<proportionPoints.length; i+=2) {
                    points.push(proportionPoints[i] * bounds.width);
                    points.push(proportionPoints[i+1] * bounds.height);
                }
                event.shape.body.attributes.points = points.join(' ');
        }
    }

}
