import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';
import { create, attr, append, innerSVG } from 'tiny-svg';
import { stringify } from 'svgson';
import { query } from 'min-dom';

/**
 *
 */
export default class MetaRenderer extends BaseRenderer {
    /**
     * @param {Object} eventBus
     * @param {Styles} styles
     */
    constructor (eventBus, canvas, styles) {
        super(eventBus, 10);
        this.canvas = canvas;
        this.styles = styles;

        eventBus.on('plugin.registered', this.registerMarker.bind(this));
    }

    registerMarker (event) {
        const metaModel = event.plugin.getMetaModel();
        const stylesheet = event.plugin.getStylesheet();

        let defs = query('defs', this.canvas._svg);
        if (!defs) {
            defs = create('defs');
            append(this.canvas._svg, defs);
        }

        metaModel.arrowHeads.forEach((arrowHead) => {
            const style = stylesheet.styles[arrowHead.type];

            console.log(style);
            const marker = create('marker');
            innerSVG(marker, stringify(style.representation));
            attr(marker, {
                id: style.targetType,
                refX: style.ref.x,
                refY: style.ref.y,
                viewBox: '0 0 20 20',
                markerWidth: 10,
                markerHeight: 10,
                orient: 'auto'
            });
            append(defs, marker);
        });
    }

    canRender (element) {
        return element.body || element.waypoints;
    }

    drawShape (graphics, element) {
        const shape = create('g');
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

        if (connection.arrowStart) {
            attr(line, {
                markerEnd: 'url(#' + connection.arrowStart + ')',
            });
        }

        if (connection.arrowEnd) {
            attr(line, {
                markerEnd: 'url(#' + connection.arrowEnd + ')',
            });
        }

        append(graphics, line);

        return line;
    }

    drawTip () {

    }

    getShapePath (shape) {
        // console.log('shape', shape);
    }
}
