import { Behavior } from '../../../core/eventBus/Behavior';


export class PlaceFigureBehavior extends Behavior {
    constructor (commandStack, create) {
        super();
        this.commandStack = commandStack;
        this.create = create;
    }

    during (context) {
        this.commandStack.execute('shape.create', {
            shape: this.create.factory(),
            position: {
                x: context.event.layerX,
                y: context.event.layerY,
            },
            event: context.event
        });
    }
}
