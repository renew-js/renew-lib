import Refs from 'object-refs';


const parentRefs = new Refs({
    name: 'children',
    enumerable: true,
    collection: true,
}, {
    name: 'parent',
});

const outgoingRefs = new Refs({
    name: 'outgoing',
    collection: true,
}, {
    name: 'source',
});

const incomingRefs = new Refs({
    name: 'incoming',
    collection: true,
}, {
    name: 'target',
});

export default class JsonImporter {

    constructor (baseImporter, elementFactory) {
        this.baseImporter = baseImporter;
        this.elementFactory = elementFactory;
    }

    /**
     * Import JSON
     * @param  {string} json The import data
     * @return {object}      The parsed import data
     */
    import (json) {
        const data = JSON.parse(json) || {};
        data.elements = data.elements || [];
        data.elements = data.elements.map((element) => {
            delete element.labels;
            delete element.children;
            return this.elementFactory.create(element.type, element);
        });
        this.baseImporter.import(data);
        return data;
    }

}
