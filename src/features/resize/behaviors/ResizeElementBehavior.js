import { Behavior } from '../../../core/eventBus/Behavior';


export class ResizeElementBehavior extends Behavior {

    constructor (eventBus, resize, elementRegistry, graphicsFactory, layouter) {
        super();
        this.eventBus = eventBus;
        this.resize = resize;
        this.elementRegistry = elementRegistry;
        this.graphicsFactory = graphicsFactory;
        this.layouter = layouter;
    }

    init (event) {
        this.resize.init(event.element.x, event.element.y);
    }

    se (event) {
        const element = event.element || event.elements[0];
        this.resize.element(element).dimension(
            element.x,
            element.y,
            Math.max(element.minWidth || 0, event.x - element.x),
            Math.max(element.minHeight || 0, event.y - element.y)
        );
    }

    after (event) {
        const element = event.element || event.elements[0];
        const shape = element.metaObject;

        const bounds = element;
        const proportions = shape.representation.proportions;

        if (!proportions) return;

        let points;
        let proportionPoints;

        switch (shape.representation.name) {
            case 'ellipse':
                shape.representation.attributes.cx =
                    proportions.cx * bounds.width;
                shape.representation.attributes.cy =
                    proportions.cy * bounds.height;
                shape.representation.attributes.rx =
                    proportions.rx * bounds.width;
                shape.representation.attributes.ry =
                    proportions.ry * bounds.height;
                break;
            case 'circle':
                shape.representation.attributes.cx =
                    proportions.cx * bounds.width;
                shape.representation.attributes.cy =
                    proportions.cy * bounds.height;
                shape.representation.attributes.r =
                    proportions.r * Math.min(bounds.width, bounds.height);
                break;
            case 'rect':
                shape.representation.attributes.x =
                    proportions.x * bounds.width;
                shape.representation.attributes.y =
                    proportions.y * bounds.height;
                shape.representation.attributes.width
                    = proportions.width * bounds.width;
                shape.representation.attributes.height
                    = proportions.height * bounds.height;
                break;
            case 'polygon':
                points = [];
                proportionPoints = proportions.points.split(' ')
                    .map(parseFloat);
                for (let i=0; i<proportionPoints.length; i+=2) {
                    points.push(proportionPoints[i] * bounds.width);
                    points.push(proportionPoints[i+1] * bounds.height);
                }
                shape.representation.attributes.points = points.join(' ');
        }

        this._updateGraphics(element, 'shape');
        element.incoming.forEach(this._layoutConnection.bind(this));
        element.outgoing.forEach(this._layoutConnection.bind(this));
    }

    _updateGraphics (element, type) {
        const gfx = this.elementRegistry.getGraphics(element.id);
        const event = { elements: [ element ], element: element, gfx: gfx };

        this.graphicsFactory.update(type || element.type, element, gfx);
        this.eventBus.fire(element.type + '.changed', event);
        this.eventBus.fire('elements.changed', event);
        this.eventBus.fire('element.changed', event);
    }

    _layoutConnection (connection) {
        connection.waypoints = this.layouter.layoutConnection(connection);
        this._updateGraphics(connection);
    }

}
