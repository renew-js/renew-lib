export default class BaseImporter {

    constructor (eventBus, elementRegistry, metaFactory, canvas) {
        this.eventBus = eventBus;
        this.elementRegistry = elementRegistry;
        this.metaFactory = metaFactory;
        this.canvas = canvas;
    }

    import (data) {
        console.log(data);
        this.verify(data);
        this.canvas._clear();
        this.canvas.getRootElement();
        this.parseElements(data.elements);
        this.canvas.zoom('fit-viewport', 'auto');
        this.metaFactory.setIncrement(data.increment);
    }

    verify (data) {
        if (!data.elements || !data.elements.length) {
            throw new Error('Import must contain elements.');
        }
        if (!data.increment) {
            throw new Error('Import must contain increment index.');
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
        const position = {
            x: element.x + element.width / 2,
            y: element.y + element.height / 2,
        };
        const parent = this.elementRegistry.get(element.parentId);
        // this.modeling.createShape(element, position, parent);
    }

    createConnection (element) {
        const parent = this.elementRegistry.get(element.parentId);
        const source = this.elementRegistry.get(element.sourceId);
        const target = this.elementRegistry.get(element.targetId);
        //this.modeling.createConnection(source, target, element, parent);
    }

    createLabel (element) {
        // TODO
    }

}
