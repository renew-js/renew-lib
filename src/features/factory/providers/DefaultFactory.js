import { ElementFactory } from './ElementFactory';


export class DefaultFactory extends ElementFactory {

    constructor () {
        super();
    }

    createConnection (attributes) {
        return super.createConnection(Object.assign({
            metaObject: {
                arrowEnd: 'arrow-head',
                lineColor: 'magenta',
            },
        }, attributes));
    }

    createShape (attributes) {
        return super.createShape(Object.assign({
            metaObject: {
                representation: {
                    name: 'rect',
                    type: 'element',
                    attributes: {
                        x: 1,
                        y: 1,
                        width: 46,
                        height: 30,
                        style: 'fill:#fff;stroke:magenta;stroke-width:2px;',
                    },
                    proportions: {
                        x: 0.02,
                        y: 0.03,
                        width: 0.96,
                        height: 0.94,
                    },
                    children: [],
                },
            },
            width: 48,
            height: 32,
        }, attributes));
    }

}
