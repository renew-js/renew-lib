import { Behavior } from '../../../core/eventBus/Behavior';

/**
 * Resize any shape and path relative to initial state
 */
export class ResizeBehavior extends Behavior {

    constructor (eventBus) {
        super();
        this.eventBus = eventBus;
    }

    during (event) {
        console.log(event);

        const shape = event.shape.businessObject;

        const bounds = event.context.newBounds;
        const proportions = shape.representation.proportions;

        if (!proportions) return;

        let points;
        let proportionPoints;

        switch (shape.representation.name) {
            case 'ellipse':
                shape.representation.attributes.cx =
                    proportions.cx * bounds.width;
                shape.representation.attributes.cy =
                    proportions.cy * bounds.height;
                shape.representation.attributes.rx =
                    proportions.rx * bounds.width;
                shape.representation.attributes.ry =
                    proportions.ry * bounds.height;
                break;
            case 'circle':
                shape.representation.attributes.cx =
                    proportions.cx * bounds.width;
                shape.representation.attributes.cy =
                    proportions.cy * bounds.height;
                shape.representation.attributes.r =
                    proportions.r * Math.min(bounds.width, bounds.height);
                break;
            case 'rect':
                shape.representation.attributes.x =
                    proportions.x * bounds.width;
                shape.representation.attributes.y =
                    proportions.y * bounds.height;
                shape.representation.attributes.width
                    = proportions.width * bounds.width;
                shape.representation.attributes.height
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
                shape.representation.attributes.points = points.join(' ');
        }
    }

}
