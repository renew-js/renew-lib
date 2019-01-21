import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';
import { create, attr, append, innerSVG } from 'tiny-svg';


/**
 *
 */
export default class SvgRenderer extends BaseRenderer {
    /**
     * @param {Object} eventBus
     */
    constructor (eventBus) {
        super(eventBus, 10);
    }

    canRender (element) {
        return true;
    }

    drawShape (graphics, element) {
        const circle = create('svg');
        innerSVG(circle, element.body);
        append(graphics, circle);
        return circle;
    }


    getShapePath (shape) {
        console.log('get shape path');
    }
}
