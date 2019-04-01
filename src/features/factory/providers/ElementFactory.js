import BaseElementFactory from 'diagram-js/lib/core/ElementFactory';
import { uid } from '../../../core/util/Uid';


export class ElementFactory extends BaseElementFactory {

    constructor () {
        super();
    }

    createShape (attrs) {
        return super.createShape(Object.assign({
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        }, attrs));
    }

    createConnection (attrs) {
        return super.createConnection(Object.assign({
            waypoints: [],
        }, attrs));
    }

    createLabel (attrs) {
        return super.createLabel(Object.assign({
            text: '',
        }, attrs));
    }

    create (type, attrs) {
        return super.create(type, Object.assign({
            id: uid(type),
            type: type,
        }, attrs));
    }

}
