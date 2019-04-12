import { Command } from '../../../core/command/Command';


export class MoveElementsCommand extends Command {

    constructor (eventBus, graphicsFactory, elementRegistry, layouter) {
        super();
        this.eventBus = eventBus;
        this.graphicsFactory = graphicsFactory;
        this.elementRegistery = elementRegistry;
        this.layouter = layouter;
    }

    execute (context) {
        context.elements.filter(this._isShape).forEach((element) => {
            let dx = context.dx;
            let dy = context.dy;
            if (context.x !== undefined && context.y !== undefined) {
                dx = context.x - element.x;
                dy = context.y - element.y;
            }
            this._moveShape(element, dx, dy);

            element.incoming.forEach(this._layoutConnection.bind(this));
            element.outgoing.forEach(this._layoutConnection.bind(this));
        });
    }

    _isShape (shape) {
        return shape.type === 'shape' || shape.type === 'label';
    }

    _moveShape (shape, dx, dy) {
        this._setPositionOfShape(shape, shape.x + dx, shape.y + dy);
    }

    _setPositionOfShape (shape, x, y) {
        shape.x = x;
        shape.y = y;
        this._updateGraphics(shape, 'shape');
    }

    _layoutConnection (connection) {
        connection.waypoints = this.layouter.layoutConnection(connection);
        this._updateGraphics(connection);
    }

    _updateGraphics (element, type) {
        const gfx = this.elementRegistery.getGraphics(element.id);
        const event = { elements: [ element ], element: element, gfx: gfx };

        this.graphicsFactory.update(type || element.type, element, gfx);
        this.eventBus.fire(element.type + '.changed', event);
        this.eventBus.fire('elements.changed', event);
        this.eventBus.fire('element.changed', event);
    }

    revert (context) {
        // TODO: ...
    }

}
