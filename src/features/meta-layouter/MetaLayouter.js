import Layouter from 'diagram-js/lib/layout/BaseLayouter';

import { getMid } from 'diagram-js/lib/layout/LayoutUtil';
import { Geometry } from '../../util/Geometry';


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
                return Geometry.intersectEllipse(line[0], line[1], {
                    cx: shape.x + parseInt(shape.body.attributes.cx),
                    cy: shape.y + parseInt(shape.body.attributes.cy),
                    rx: shape.body.attributes.rx,
                    ry: shape.body.attributes.ry,
                }) || line[1];
            case 'rect':
                return Geometry.intersectRectangle(line[0], line[1], {
                    x: shape.x + parseInt(shape.body.attributes.x),
                    y: shape.y + parseInt(shape.body.attributes.y),
                    width: parseInt(shape.body.attributes.width),
                    height: parseInt(shape.body.attributes.height),
                }) || line[1];
            case 'polyline':
                let pairs = shape.body.attributes.points.split(' ');
                return Geometry.intersectPolyline(line[0], line[1], {
                    points: pairs.map((pair) => {
                        let p = pair.split(',');
                        return {
                            x: shape.x + parseInt(p[0]),
                            y: shape.y + parseInt(p[1])
                        };
                    })
                });
            case 'polygon':
                let p = shape.body.attributes.points.split(' ');
                let points = [];
                for (let i=0; i<p.length; i+=2) {
                    points.push({
                        x: shape.x + parseInt(p[i]),
                        y: shape.y + parseInt(p[i+1])
                    });
                }
                points.push(points[0]);
                return Geometry.intersectPolyline(line[0], line[1], {
                    points: points
                }) || line[1];
            case 'path':
        }
        return line[1];
    }

}
