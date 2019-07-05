import {
    create,
    classes,
    append,
} from 'tiny-svg';

import BaseCanvas from 'diagram-js/lib/core/Canvas';


export class Canvas extends BaseCanvas {

    constructor (config, eventBus, graphicsFactory, elementRegistry) {
        super(config, eventBus, graphicsFactory, elementRegistry);
        this.eventBus = eventBus;
        this._uiGroup = this.createUiGroup();
        this._defs = this.createDefs();
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
