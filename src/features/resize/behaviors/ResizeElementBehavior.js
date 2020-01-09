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
        this.resize.init(event.element || event.elements[0]);
    }

    before (event) {
    }

    nw (event) {
        const error = {
            x: event.sx - this.resize.start.x,
            y: event.sy - this.resize.start.y,
        };
        this.resize.dimension(
            Math.min(
                event.x - error.x,
                this.resize.start.x + this.resize.start.width
            ),
            Math.min(
                event.y - error.y,
                this.resize.start.y + this.resize.start.height
            ),
            Math.max(1, event.sx - event.x + this.resize.start.width),
            Math.max(1, event.sy - event.y + this.resize.start.height)
        );
    }

    ne (event) {
        const error = {
            x: event.sx - this.resize.start.x - this.resize.start.width,
            y: event.sy - this.resize.start.y,
        };
        this.resize.dimension(
            this.resize.start.x,
            Math.min(
                event.y - error.y,
                this.resize.start.y + this.resize.start.height
            ),
            Math.max(1, event.x - error.x - this.resize.start.x),
            Math.max(1, event.sy - event.y + this.resize.start.height)
        );
    }

    sw (event) {
        const error = {
            x: event.sx - this.resize.start.x,
            y: event.sy - this.resize.start.y - this.resize.start.height,
        };
        this.resize.dimension(
            Math.min(
                event.x - error.x,
                this.resize.start.x + this.resize.start.width
            ),
            this.resize.start.y,
            Math.max(1, event.sx - event.x + this.resize.start.width),
            Math.max(1, event.y - error.y - this.resize.start.y)
        );
    }

    se (event) {
        const error = {
            x: event.sx - this.resize.start.x - this.resize.start.width,
            y: event.sy - this.resize.start.y - this.resize.start.height,
        };
        this.resize.dimension(
            this.resize.start.x,
            this.resize.start.y,
            Math.max(1, event.x - error.x - this.resize.start.x),
            Math.max(1, event.y - error.y - this.resize.start.y)
        );
    }

    n (event) {
        const error = {
            x: event.sx - this.resize.start.x - this.resize.start.width / 2,
            y: event.sy - this.resize.start.y,
        };
        this.resize.dimension(
            this.resize.start.x,
            Math.min(
                event.y - error.y,
                this.resize.start.y + this.resize.start.height
            ),
            this.resize.start.width,
            Math.max(1, event.sy - event.y + this.resize.start.height)
        );
    }

    e (event) {
        const error = {
            x: event.sx - this.resize.start.x - this.resize.start.width,
            y: event.sy - this.resize.start.y - this.resize.start.height / 2,
        };
        this.resize.dimension(
            this.resize.start.x,
            this.resize.start.y,
            Math.max(1, event.x - error.x - this.resize.start.x),
            this.resize.start.height
        );
    }

    s (event) {
        const error = {
            x: event.sx - this.resize.start.x - this.resize.start.width / 2,
            y: event.sy - this.resize.start.y - this.resize.start.height,
        };
        this.resize.dimension(
            this.resize.start.x,
            this.resize.start.y,
            this.resize.start.width,
            Math.max(1, event.y - error.y - this.resize.start.y)
        );
    }

    w (event) {
        const error = {
            x: event.sx - this.resize.start.x,
            y: event.sy - this.resize.start.y - this.resize.start.height / 2,
        };
        this.resize.dimension(
            Math.min(
                event.x - error.x,
                this.resize.start.x + this.resize.start.width
            ),
            this.resize.start.y,
            Math.max(1, event.sx - event.x + this.resize.start.width),
            this.resize.start.height
        );
    }

    after (event) {
        if (!this.resize.element || !this.resize.element.metaObject) {
            return;
        }

        const shape = this.resize.element.metaObject;

        const bounds = this.resize.element;
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

        this._updateGraphics(this.resize.element, 'shape');
        this.resize.element.incoming.forEach(this._layoutConnection.bind(this));
        this.resize.element.outgoing.forEach(this._layoutConnection.bind(this));
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
