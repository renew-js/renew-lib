import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';
import { create, attr, append, innerSVG } from 'tiny-svg';
import { stringify } from 'svgson';
import { query } from 'min-dom'; // TODO: install min dom


export class Renderer extends BaseRenderer {

    constructor (eventBus, canvas, styles) {
        super(eventBus, 10);
        this.canvas = canvas;
        this.styles = styles;
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

            const marker = create('marker');
            innerSVG(marker, stringify(style.representation));
            attr(marker, {
                id: style.targetType,
                refX: style.ref.x,
                refY: style.ref.y,
                viewBox: '0 0 20 20',
                markerWidth: 10,
                markerHeight: 10,
                orient: 'auto',
            });
            append(defs, marker);
        });
    }

    canRender (element) {
        console.log('renderer', element);
        return (element.metaObject && element.metaObject.representation)
            || element.waypoints;
    }

    drawShape (graphics, element) {
        const shape = create('g');
        innerSVG(shape, stringify(element.metaObject.representation));
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
            fill: 'none',
        }));
        if (connection.metaObject && connection.metaObject.lineColor) {
            attr(line, { stroke: connection.metaObject.lineColor });
        }

        if (connection.metaObject && connection.metaObject.arrowStart) {
            attr(line, {
                markerEnd: 'url(#' + connection.metaObject.arrowStart + ')',
            });
        }

        if (connection.metaObject && connection.metaObject.arrowEnd) {
            attr(line, {
                markerEnd: 'url(#' + connection.metaObject.arrowEnd + ')',
            });
        }

        append(graphics, line);

        return line;
    }

    drawTip () {

    }

    getShapePath (shape) {

    }

}
