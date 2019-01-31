import Layouter from 'diagram-js/lib/layout/BaseLayouter';

import { getMid } from 'diagram-js/lib/layout/LayoutUtil';


export class MetaLayouter extends Layouter {
    constructor () {
        super();
    }

    layoutConnection (connection, hints) {
        const line = [ getMid(connection.target), getMid(connection.source) ];

        return [
            this.intersect(line, connection.source),
            this.intersect(line.reverse(), connection.target)
        ];
    }

    intersect (line, shape) {
        switch (shape.body.name) {
            case 'ellipse':
                return this.intersectEllipse(line, shape) || line[1];
            case 'rect':
                return this.intersectRectangle(line, shape) || line[1];
        }
        return line[1];
    }

    intersectEllipse (line, shape) {
        const a = shape.body.attributes.rx * shape.body.attributes.rx;
        const b = shape.body.attributes.ry * shape.body.attributes.ry;

        const cx = shape.x + parseInt(shape.body.attributes.cx);
        const cy = shape.y + parseInt(shape.body.attributes.cy);

        const x0 = line[0].x - cx;
        const x1 = line[1].x - cx;
        const y0 = line[0].y - cy;
        const y1 = line[1].y - cy;

        const dx = (x1 - x0);
        const dy = (y1 - y0);

        const A = dx * dx / a + dy * dy / b;
        const B = 2 * x0 * dx / a + 2 * y0 * dy / b;
        const C = x0 * x0 / a + y0 * y0 / b - 1;

        const d = B * B - 4 * A * C;

        if (d < 0) return false;

        const t = (-B - Math.sqrt(d)) / 2 / A;

        return { x: x0 + dx * t + cx, y: y0 + dy * t + cy };
    }

    intersectRectangle (line, shape) {
        let rect = {
            x: shape.x + parseInt(shape.body.attributes.x),
            y: shape.y + parseInt(shape.body.attributes.y),
            width: parseInt(shape.body.attributes.width),
            height: parseInt(shape.body.attributes.height),
        };
        return this.intersectRect(line[0], line[1], rect);
    }

    corners (rect) {
        return {
            NW: { x: rect.x, y: rect.y },
            NE: { x: rect.x + rect.width, y: rect.y },
            SW: { x: rect.x, y: rect.y + rect.height },
            SE: { x: rect.x + rect.width, y: rect.y + rect.height },
        };
    }

    intersectLine (p1, p2, p3, p4) {
        return this.intersectAt(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);
    }

    intersectAt (x1, y1, x2, y2, x3, y3, x4, y4) {
        let Ax = x1 - x2, Ay = y2 - y1;
        let Bx = x3 - x4, By = y4 - y3;

        let delta = Ay * Bx - By * Ax;

        if (delta === 0) return null;

        let CA = Ax * y1 + Ay * x1;
        let CB = Bx * y3 + By * x3;

        let invertedDelta = 1 / delta;
        return {
            x: (Bx * CA - Ax * CB) * invertedDelta,
            y: (Ay * CB - By * CA) * invertedDelta
        };
    }

    intersectRect (p1, p2, r) {
        let c = this.corners(r);
        let p = null;

        if (p1.x < c.NW.x) {
            p = this.intersectLine(p1, p2, c.NW, c.SW);
            if (p1.y > c.SW.y && (p.y < c.NW.y || p.y > c.SW.y)) {
                p = this.intersectLine(p1, p2, c.SE, c.SW);
            }
            if (p1.y < c.NW.y && (p.y < c.NW.y || p.y > c.SW.y)) {
                p = this.intersectLine(p1, p2, c.NE, c.NW);
            }
        } else if (p1.x > c.NE.x) {
            p = this.intersectLine(p1, p2, c.NE, c.SE);
            if (p1.y < c.NE.y && (p.y < c.NE.y || p.y > c.SE.y)) {
                p = this.intersectLine(p1, p2, c.NE, c.NW);
            } else if (p1.y > c.SE.y && (p.y < c.NE.y || p.y > c.SE.y)) {
                p = this.intersectLine(p1, p2, c.SE, c.SW);
            }
        } else if (p1.y < c.NW.y) {
            p = this.intersectLine(p1, p2, c.NE, c.NW);
        } else if (p1.y > c.SE.y) {
            p = this.intersectLine(p1, p2, c.SE, c.SW);
        }

        if (p.x >= c.NW.x && p.x <= c.NE.x && p.y >= c.NW.y && p.y <= c.SW.y) {
            return p;
        }
        return false;
    }
}
