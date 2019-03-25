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
    }

    parseElements (elements) {
        elements.forEach((element) => {
            switch (element.type) {
                case 'shape':
                    this.createShape(element);
                    break;
                case 'connection':
                    this.createConnection(element);
                    break;
                case 'label':
                    this.createLabel(element);
                    break;
            }
        });
    }

    createShape (element) {
        const parent = this.elementRegistry.get(element.parentId);
        this.canvas.addShape(element, parent);
    }

    createConnection (element) {
        const parent = this.elementRegistry.get(element.parentId);
        const source = this.elementRegistry.get(element.sourceId);
        const target = this.elementRegistry.get(element.targetId);
        element.source = source;
        element.target = target;
        element.waypoints = this.layouter.layoutConnection(element);
        this.canvas.addConnection(element, parent);
    }

    createLabel (element) {
        // TODO
    }

}
