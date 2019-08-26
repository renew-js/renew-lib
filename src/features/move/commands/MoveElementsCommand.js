import { Command } from '../../../core/command/Command';


export class MoveElementsCommand extends Command {

    constructor (eventBus, canvas, layouter) {
        super();
        this.eventBus = eventBus;
        this.graphicsFactory = canvas.getGraphicsFactory();
        this.elementRegistry = canvas.getElementRegistry();
        this.layouter = layouter;

        this.moves = [];
    }

    execute (context) {
        this.moves.forEach((move) => {
            if (this._isShape(move.element)) {
                this._moveShape(move.element, move.dx, move.dy);
            } else if (move.element.waypoints) {
                this._moveConnection(move.element, move.dx, move.dy);
            }

            if (move.element.labels) {
                move.element.labels.forEach((label) => {
                    this._moveShape(label, move.dx, move.dy);
                });
            }

            if (move.element.incoming) {
                move.element.incoming
                    .forEach(this._layoutConnection.bind(this));
            }
            if (move.element.outgoing) {
                move.element.outgoing
                    .forEach(this._layoutConnection.bind(this));
            }
        });
    }

    _isShape (shape) {
        return shape.type === 'shape' || shape.type === 'label';
    }

    _isConnection (element) {
        return element.type === 'connection';
    }

    _moveShape (shape, dx, dy) {
        this._setPositionOfShape(shape, shape.x + dx, shape.y + dy);
    }

    _moveConnection (connection, dx, dy) {
        if (!connection.source.type) {
            connection.source.x += dx;
            connection.source.y += dy;
        }

        if (!connection.target.type) {
            connection.target.x += dx;
            connection.target.y += dy;
        }

        for (let i = 1; i < connection.waypoints.length -1; i++) {
            connection.waypoints[i].x += dx;
            connection.waypoints[i].y += dy;
        }
        this._layoutConnection(connection);
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
        const gfx = this.elementRegistry.getGraphics(element.id);
        const event = { elements: [ element ], element: element, gfx: gfx };

        this.graphicsFactory.update(type || element.type, element, gfx);
        this.eventBus.fire(element.type + '.changed', event);
        this.eventBus.fire('elements.changed', event);
        this.eventBus.fire('element.changed', event);
    }

    revert (context) {
        this.moves.forEach((move) => {
            if (move.element.waypoints) {
                this._moveConnection(move.element, -move.dx, -move.dy);
            } else {
                this._moveShape(move.element, -move.dx, -move.dy);
            }

            move.element.incoming.forEach(this._layoutConnection.bind(this));
            move.element.outgoing.forEach(this._layoutConnection.bind(this));
        });
    }

}
