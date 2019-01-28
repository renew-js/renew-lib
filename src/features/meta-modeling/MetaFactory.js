import ElementFactory from 'diagram-js/lib/core/ElementFactory';


export class MetaFactory extends ElementFactory {
    constructor () {
        super();
        this.type = '';
    }

    createElement (type, attributes) {
        attributes.type = this.type + ':' + type;
        console.log('create', attributes.type, attributes);
        return this.createShape(attributes);
    }
}
