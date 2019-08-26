import {
    create,
    classes,
    append,
} from 'tiny-svg';

import BaseCanvas from 'diagram-js/lib/core/Canvas';
import { Geometry } from '../util/Geometry';


export class Canvas extends BaseCanvas {

    constructor (config, eventBus, graphicsFactory, elementRegistry) {
        super(config, eventBus, graphicsFactory, elementRegistry);
        this.eventBus = eventBus;
        this._uiGroup = this.createUiGroup();
        this._defs = this.createDefs();
    }

    updateGraphics (element) {
        const gfx = this._elementRegistry.getGraphics(element);
        const event = { elements: [ element ], element: element, gfx: gfx };

        this._graphicsFactory.update('shape', element, gfx);

        this.eventBus.fire('shape.changed', event);
        this.eventBus.fire('elements.changed', event);
        this.eventBus.fire('element.changed', event);
    }

    objectsAt (point) {
        return this.getElements().filter((element) => {
            return Geometry.intersectRect(point, element);
        });
    }

    shapesAt (point) {
        return this.objectsAt(point).filter((element) => {
            return element.type === 'shape';
        });
    }

    getElementRegistry () {
        return this._elementRegistry;
    }

    getGraphicsFactory () {
        return this._graphicsFactory;
    }

    getChildren () {
        const elements = this._elementRegistry._elements;
        return Object.values(elements).filter((object) => {
            return object.element.id !== '__implicitroot';
        });
    }

    getElements () {
        return this.getChildren().map((object) => object.element);
    }

    createDefs () {
        const defs = create('defs');
        append(this._svg, defs);
        return defs;
    }

    createUiGroup () {
        const group = create('g');
        classes(group).add('ui');
        append(this._svg, group);
        return group;
    }

    getCurrentScale () {
        return +this._viewport.getCTM().a.toFixed(5);
    }

    addShape (element, parent, parentIndex) {
        const shape = super.addShape(element, parent, parentIndex);
        if (element.type === 'shape') {
            this.eventBus.fire('resize.element', { element });
        }
        return shape;
    }

    addUiElement (type, element) {
        this._ensureValid(type, element);

        const parent = this.getRootElement();

        this.eventBus.fire(type + '.add', { element, parent });

        const gfx = this.graphicsFactory.create(type, element);

        this.graphicsFactory.update(type, element, gfx);

        this.eventBus.fire(type + '.added', { element, gfx });

        return element;
    }

}
