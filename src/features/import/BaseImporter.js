export default class BaseImporter {

    constructor (eventBus, elementRegistry, canvas, layouter) {
        this.eventBus = eventBus;
        this.elementRegistry = elementRegistry;
        this.canvas = canvas;
        this.layouter = layouter;
    }

    import (data) {
        console.log(data);
        this.verify(data);
        this.canvas._clear();
        this.canvas.getRootElement();
        this.parseElements(data.elements);
        this.canvas.zoom('fit-viewport', 'auto');
    }

    verify (data) {
        if (!data.elements || !data.elements.length) {
            throw new Error('Import must contain elements.');
        }
        // TODO error handling
    }

    parseElements (elements) {
        elements.forEach((element) => {
            delete element.labels; // TODO deserialize labels
            delete element.children; // TODO deserialize children
            switch (element.class) {
                case 'Classifier':
                    this.createShape(element);
                    break;
                case 'Connection':
                    this.createConnection(element);
                    break;
                case 'Text':
                    this.createLabel(element);
                    break;
            }
        });
    }

    createShape (element) {
        const parent = this.elementRegistry.get(element.parentId);
        element.x += element.width / 2;
        element.y += element.height / 2;
        this.canvas.addShape(element, parent);
    }

    createConnection (element) {
        const parent = this.elementRegistry.get(element.parentId);
        const source = this.elementRegistry.get(element.sourceId);
        const target = this.elementRegistry.get(element.targetId);
        source.outgoing.push(element);
        element.source = source;
        target.incoming.push(target);
        element.target = target;
        element.waypoints = this.layouter.layoutConnection(element);
        this.canvas.addConnection(element, parent);
    }

    createLabel (element) {
        // TODO
    }

}
