import { Command } from '../../../core/command/Command';


export class MoveElementsCommand extends Command {

    constructor (eventBus, graphicsFactory, elementRegistry) {
        super();
        this.eventBus = eventBus;
        this.graphicsFactory = graphicsFactory;
        this.elementRegistery = elementRegistry;
    }

    execute (context) {
        context.elements.forEach((element) => {
            this._moveShape(
                element,
                context.dx || (context.x - element.x),
                context.dy || (context.y - element.y)
            );
        });
    }

    _moveShape (shape, dx, dy) {
        this._setPositionOfShape(shape, shape.x + dx, shape.y + dy);
    }

    _setPositionOfShape (shape, x, y) {
        shape.x = x;
        shape.y = y;
        this._updateGraphics(shape);
    }

    _updateGraphics (element) {
        this.graphicsFactory.update(
            'shape',
            element,
            this.elementRegistery.getGraphics(element.id)
        );
        this.eventBus.fire('element.changed', { element: element });
    }

    revert (context) {
        // TODO: ...
    }
}
