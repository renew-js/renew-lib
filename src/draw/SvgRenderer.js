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
        // console.log('g', graphics);
        // console.log('e', element);
        const rawSvg = atob(element.body);
        // console.log('i', innerSVG(rawSvg));
        const circle = create('circle');
        attr(circle, {
            cx: element.width / 2,
            cy: element.height / 2,
            r: element.width / 2 });
        append(graphics, circle);

        return circle;
    }


    getShapePath (shape) {
        console.log('get shape path');
    }
}
