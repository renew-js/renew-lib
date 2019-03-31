import BaseElementFactory from 'diagram-js/lib/core/ElementFactory';
import { uid } from './util/Uid';


export class ElementFactory extends BaseElementFactory {

    constructor () {
        super();
    }

    create (type, attrs) {
        return super.create(type, Object.assign({
            id: uid(type),
            type: type,
        }, attrs));
    }

}
