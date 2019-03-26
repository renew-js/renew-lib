import BaseElementFactory from 'diagram-js/lib/core/ElementFactory';


export class ElementFactory extends BaseElementFactory {

    constructor () {
        super();
    }

    create (type, attrs) {
        return super.create(type, Object.assign(attrs, { type: type }));
    }

}
