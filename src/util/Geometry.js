export class Geometry {
    static distance (p0, p1) {
        return Math.sqrt(Math.pow(p1.x - p0.x, 2) + Math.pow(p1.y - p0.y, 2));
    }

    static intersect (p0, p1, p2, p3) {
        return this.intersectAt(p0.x, p0.y, p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
    }

    static intersectAt (x0, y0, x1, y1, x2, y2, x3, y3) {
        let Ax = x0 - x1, Ay = y1 - y0;
        let Bx = x2 - x3, By = y3 - y2;

        let delta = Ay * Bx - By * Ax;

        if (delta === 0) return null;

        let CA = Ax * y0 + Ay * x0;
        let CB = Bx * y2 + By * x2;

        let invertedDelta = 1 / delta;
        return {
            x: (Bx * CA - Ax * CB) * invertedDelta,
            y: (Ay * CB - By * CA) * invertedDelta
        };
    }

    static intersectPolygon (p0, p1, polygon) {
        let intersects = [];
        for (let i=0; i<polygon.points.length-1; i++) {
            let s = polygon.points[i];
            let t = polygon.points[i+1];

            let p = this.intersect(p0, p1, s, t);

            if (!p) continue;

            let min = { x: Math.min(s.x, t.x), y: Math.min(s.y, t.y) };
            let max = { x: Math.max(s.x, t.x), y: Math.max(s.y, t.y) };

            if (min.x <= p.x && min.y <= p.y && max.x >= p.x && max.y >= p.y) {
                intersects.push(p);
            }
        }

        if (intersects.length === 0) return false;
        else if (intersects.length === 1) return intersects[0];

        return intersects.reduce((result, p) => {
            let d = Geometry.distance(p0, p);
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

    static intersectRectangle (p0, p1, r) {
        let c = this.corners(r);
        let p = null;

        if (p0.x < c.NW.x) {
            p = this.intersect(p0, p1, c.NW, c.SW);
            if (p0.y > c.SW.y && (p.y < c.NW.y || p.y > c.SW.y)) {
                p = this.intersect(p0, p1, c.SE, c.SW);
            }
            if (p0.y < c.NW.y && (p.y < c.NW.y || p.y > c.SW.y)) {
                p = this.intersect(p0, p1, c.NE, c.NW);
            }
        } else if (p0.x > c.NE.x) {
            p = this.intersect(p0, p1, c.NE, c.SE);
            if (p0.y < c.NE.y && (p.y < c.NE.y || p.y > c.SE.y)) {
                p = this.intersect(p0, p1, c.NE, c.NW);
            } else if (p0.y > c.SE.y && (p.y < c.NE.y || p.y > c.SE.y)) {
                p = this.intersect(p0, p1, c.SE, c.SW);
            }
        } else if (p0.y < c.NW.y) {
            p = this.intersect(p0, p1, c.NE, c.NW);
        } else if (p0.y > c.SE.y) {
            p = this.intersect(p0, p1, c.SE, c.SW);
        }

        if (p.x >= c.NW.x && p.x <= c.NE.x && p.y >= c.NW.y && p.y <= c.SW.y) {
            return p;
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
        const B = 2 * x0 * dx / a + 2 * y0 * dy / b;
        const C = x0 * x0 / a + y0 * y0 / b - 1;

        const d = B * B - 4 * A * C;

        if (d < 0) return false;

        const t = (-B - Math.sqrt(d)) / 2 / A;

        return { x: x0 + dx * t + e.cx, y: y0 + dy * t + e.cy };
    }
}
