import { Behavior } from '../../../core/Behavior';


export class MouseDownBehavior extends Behavior {
    constructor (commandStack, create) {
        super();
        this.commandStack = commandStack;
        this.create = create;
    }

    during (context) {

        console.log(context.event);
        console.log(context.layerX, context.layerY);
        this.commandStack.execute('shape.create', {
            shape: this.create.factory(),
            position: {
                x: context.event.layerX,
                y: context.event.layerY,
            },
            parent: context.event.parent,
            event: context.event
        });
    }
}
