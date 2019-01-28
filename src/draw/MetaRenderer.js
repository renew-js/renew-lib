import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';
import { create, attr, append, innerSVG } from 'tiny-svg';
import { stringify } from 'svgson';


/**
 *
 */
export default class MetaRenderer extends BaseRenderer {
    /**
     * @param {Object} eventBus
     */
    constructor (eventBus) {
        super(eventBus, 10);
    }

    canRender (element) {
        return element.body;
    }

    drawShape (graphics, element) {
        const circle = create('svg');
        innerSVG(circle, stringify(element.body));
        append(graphics, circle);
        return circle;
    }

    drawConnection (graphics, connection) {
        console.log(connection);
    }

    getShapePath (shape) {
        // console.log('shape', shape);
    }
}
