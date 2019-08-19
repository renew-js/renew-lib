export class Geometry {

    static localToGlobal (shape, point) {
        return { x: shape.x + point.x, y: shape.y + point.y };
    }

    static distance (p0, p1) {
        return Math.sqrt(Math.pow(p1.x - p0.x, 2) + Math.pow(p1.y - p0.y, 2));
    }

    static intersect (p0, p1, p2, p3) {
        return this.intersectAt(p0.x, p0.y, p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
    }

    static intersectAt (x0, y0, x1, y1, x2, y2, x3, y3) {
        const Ax = x0 - x1; const Ay = y1 - y0;
        const Bx = x2 - x3; const By = y3 - y2;

        const delta = Ay * Bx - By * Ax;

        if (delta === 0) return false;

        const CA = Ax * y0 + Ay * x0;
        const CB = Bx * y2 + By * x2;

        const invertedDelta = 1 / delta;
        const p = {
            x: (Bx * CA - Ax * CB) * invertedDelta,
            y: (Ay * CB - By * CA) * invertedDelta,
        };

        const min = { x: Math.min(x2, x3), y: Math.min(y2, y3) };
        const max = { x: Math.max(x2, x3), y: Math.max(y2, y3) };

        if (Math.round(min.x) <= Math.round(p.x)
            && Math.round(min.y) <= Math.round(p.y)
            && Math.round(max.x) >= Math.round(p.x)
            && Math.round(max.y) >= Math.round(p.y)) {
            return p;
        }
        return false;
    }

    static intersectPolyline (p0, p1, poly) {
        const intersects = [];
        for (let i=0; i<poly.points.length-1; i++) {
            const p = this.intersect(p0, p1, poly.points[i], poly.points[i+1]);
            if (p) intersects.push(p);
        }

        if (intersects.length === 0) return false;
        else if (intersects.length === 1) return intersects[0];

        return this.closest(intersects, p0);
    }

    static closest (points, point) {
        return points.reduce((result, p) => {
            const d = Geometry.distance(point, p);
            return d < result.d ? { p: p, d: d } : result;
        }, { p: null, d: Infinity }).p;
    }

    static corners (r) {
        return {
            NW: { x: r.x, y: r.y },
            NE: { x: r.x + r.width, y: r.y },
            SW: { x: r.x, y: r.y + r.height },
            SE: { x: r.x + r.width, y: r.y + r.height },
        };
    }

    static intersectRect (point, rect) {
        return self.intersectRectangle(point.x, point.y, rect);
    }

    static intersectRectangle (p0, p1, r) {
        const c = this.corners(r);

        if (p0.x < c.NW.x) {
            return this.intersect(p0, p1, c.NW, c.SW) || (p0.y < c.SW.y
                ? this.intersect(p0, p1, c.NE, c.NW)
                : this.intersect(p0, p1, c.SE, c.SW));
        } else if (p0.x > c.NE.x) {
            return this.intersect(p0, p1, c.NE, c.SE) || (p0.y < c.NE.y
                ? this.intersect(p0, p1, c.NE, c.NW)
                : this.intersect(p0, p1, c.SE, c.SW));
        } else if (p0.y < c.NW.y) {
            return this.intersect(p0, p1, c.NE, c.NW);
        } else if (p0.y > c.SE.y) {
            return this.intersect(p0, p1, c.SE, c.SW);
        }

        return false;
    }

    static intersectEllipse (p0, p1, e) {
        const a = e.rx * e.rx;
        const b = e.ry * e.ry;

        const x0 = p0.x - e.cx;
        const y0 = p0.y - e.cy;
        const x1 = p1.x - e.cx;
        const y1 = p1.y - e.cy;

        const dx = (x1 - x0);
        const dy = (y1 - y0);

        const A = dx * dx / a + dy * dy / b;
        const B = 2 * (x0 * dx / a + y0 * dy / b);
        const C = x0 * x0 / a + y0 * y0 / b - 1;

        const d = B * B - 4 * A * C;

        if (d < 0) return false;

        const t = (-B - Math.sqrt(d)) / (2 * A);

        return { x: x0 + dx * t + e.cx, y: y0 + dy * t + e.cy };
    }

}
