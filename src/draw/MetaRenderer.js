import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';
import { create, attr, append, innerSVG } from 'tiny-svg';
import { stringify } from 'svgson';


/**
 *
 */
export default class MetaRenderer extends BaseRenderer {
    /**
     * @param {Object} eventBus
     * @param {Styles} styles
     */
    constructor (eventBus, styles) {
        super(eventBus, 10);
        this.styles = styles;
    }

    canRender (element) {
        return element.body || element.waypoints;
    }

    drawShape (graphics, element) {
        const shape = create('svg');
        innerSVG(shape, stringify(element.body));
        append(graphics, shape);
        return shape;
    }

    drawConnection (graphics, connection) {
        const line = create('polyline');

        attr(line, {
            points: connection.waypoints.reduce((result, point) => {
                return result + point.x + ',' + point.y + ' ';
            }, ''),
        });
        attr(line, this.styles.style([ 'no-fill' ], {
            stroke: 'black',
            strokeWidth: 2,
            fill: 'none'
        }));

        append(graphics, line);

        return line;
    }

    getShapePath (shape) {
        // console.log('shape', shape);
    }
}
