import { Provider } from '../../../core/Provider';


export class Importer extends Provider {

    constructor (elementRegistry, layouter) {
        super();
        this.elementRegistry = elementRegistry;
        this.layouter = layouter;
    }

    import (data) {
        this.verify(data);
        this.createElements(data.elements);
    }

    verify (data) {
        if (!data.elements || !data.elements.length) {
            throw new Error('Import must contain elements.');
        }
    }

    createElements (elements) {
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
        if (!element.waypoints || !element.waypoints.length) {
            element.waypoints = this.layouter.layoutConnection(element);
        }
        this.canvas.addConnection(element, parent);
    }

    createLabel (element) {
        if (element.parent && element.parent.waypoints) {
            const bbox = this.canvas.getBBox(element.parent);
            element.x += bbox.x + bbox.width / 2;
            element.y += bbox.y + bbox.height / 2;
        }
        this.createShape(element);
        this.eventBus.fire('edit.update', { element });
    }

}
