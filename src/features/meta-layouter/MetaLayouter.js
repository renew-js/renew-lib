import Layouter from 'diagram-js/lib/layout/BaseLayouter';

import { getMid } from 'diagram-js/lib/layout/LayoutUtil';
import { Geometry } from '../../util/Geometry';
import { PathParser } from '../../util/PathParser';

import Bezier from 'bezier-js';


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
        let intersection = null;
        switch (shape.body.name) {
            case 'circle':
                intersection = Geometry.intersectEllipse(line[0], line[1], {
                    cx: shape.x + parseInt(shape.body.attributes.cx),
                    cy: shape.y + parseInt(shape.body.attributes.cy),
                    rx: shape.body.attributes.r,
                    ry: shape.body.attributes.r,
                });
                break;
            case 'ellipse':
                intersection = Geometry.intersectEllipse(line[0], line[1], {
                    cx: shape.x + parseInt(shape.body.attributes.cx),
                    cy: shape.y + parseInt(shape.body.attributes.cy),
                    rx: shape.body.attributes.rx,
                    ry: shape.body.attributes.ry,
                });
                break;
            case 'rect':
                intersection = Geometry.intersectRectangle(line[0], line[1], {
                    x: shape.x + parseInt(shape.body.attributes.x),
                    y: shape.y + parseInt(shape.body.attributes.y),
                    width: parseInt(shape.body.attributes.width),
                    height: parseInt(shape.body.attributes.height),
                });
                break;
            case 'polyline':
                let pairs = shape.body.attributes.points.split(' ');
                intersection = Geometry.intersectPolyline(line[0], line[1], {
                    points: pairs.map((pair) => {
                        let p = pair.split(',');
                        return Geometry.localToGlobal(shape, {
                            x: parseInt(p[0]),
                            y: parseInt(p[1])
                        });
                    })
                });
                break;
            case 'line':
                let p1 = Geometry.localToGlobal(shape, {
                    x: parseInt(shape.body.attributes.x1),
                    y: parseInt(shape.body.attributes.y1)
                });
                let p2 = Geometry.localToGlobal(shape, {
                    x: parseInt(shape.body.attributes.x2),
                    y: parseInt(shape.body.attributes.y2)
                });
                intersection = Geometry.intersect(line[0], line[1], p1, p2);
                break;
            case 'polygon':
                let p = shape.body.attributes.points.split(' ');
                let points = [];
                for (let i=0; i<p.length; i+=2) {
                    points.push(Geometry.localToGlobal(shape, {
                        x: parseInt(p[i]),
                        y: parseInt(p[i+1])
                    }));
                }
                points.push(points[0]);
                intersection = Geometry.intersectPolyline(line[0], line[1], {
                    points: points
                });
                break;
            case 'path':
                let path = new PathParser(shape.body.attributes.d);
                let segment;
                let segments = [];
                let intersects = [];
                while ((segment = path.nextSegment())) {
                    segments.push(segment);
                    switch (segment.type) {
                        case 'line':
                            intersection = Geometry.intersect(
                                line[0], line[1],
                                Geometry.localToGlobal(shape, segment.src),
                                Geometry.localToGlobal(shape, segment.dest),
                            );
                            if (intersection) {
                                intersects.push(intersection);
                            }
                            break;
                        case 'cubic':
                            segment.src = Geometry.localToGlobal(shape, segment.src);
                            segment.dest = Geometry.localToGlobal(shape, segment.dest);
                            segment.bezier1 = Geometry.localToGlobal(shape, segment.bezier1);
                            segment.bezier2 = Geometry.localToGlobal(shape, segment.bezier2);

                            let bezier = new Bezier(
                                segment.src.x, segment.src.y,
                                segment.bezier1.x, segment.bezier1.y,
                                segment.bezier2.x, segment.bezier2.y,
                                segment.dest.x, segment.dest.y,
                            );

                            bezier.intersects({ p1: line[0], p2: line[1] }).forEach(t => {
                                intersects.push(bezier.get(t));
                            });
                            break;
                        case 'quadratic':
                            segment.src = Geometry.localToGlobal(shape, segment.src);
                            segment.dest = Geometry.localToGlobal(shape, segment.dest);
                            segment.bezier = Geometry.localToGlobal(shape, segment.bezier);

                            let bezie = new Bezier(
                                segment.src.x, segment.src.y,
                                segment.bezier.x, segment.bezier.y,
                                segment.dest.x, segment.dest.y,
                            );

                            bezie.intersects({ p1: line[0], p2: line[1] }).forEach(t => {
                                intersects.push(bezie.get(t));
                            });
                    }
                }
                console.log(segments, intersects);
                intersection = Geometry.closest(intersects, line[0]);
        }
        return intersection || line[1];
    }

}
