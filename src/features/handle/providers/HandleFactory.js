import { ElementFactory } from '../../factory/providers/ElementFactory';


export class HandleFactory extends ElementFactory {

    constructor () {
        super();
    }

    createShape (attributes = {}) {
        return super.createShape(Object.assign({
            type: 'handle',
            metaObject: {
                representation: {
                    name: 'rect',
                    type: 'element',
                    attributes: {
                        x: 1,
                        y: 1,
                        width: 6,
                        height: 6,
                        style: 'fill:#fff;stroke:magenta;stroke-width:2px;',
                    },
                    children: [],
                },
            },
            width: 8,
            height: 8,
        }, attributes));
    }

}
