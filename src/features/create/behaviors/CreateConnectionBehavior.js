import { Behavior } from '../../../core/eventBus/Behavior';


export class CreateConnectionBehavior extends Behavior {

    constructor (commandStack, create) {
        super();
        this.commandStack = commandStack;
        this.create = create;

        this.connection = null;
    }

    during (event) {
        let source;
        let target;

        if (event.hoverStart && event.hoverStart.x && event.hoverStart.y) {
            source = event.hoverStart;
        } else {
            source = { x: event.sx, y: event.sy };
        }
        if (event.hover && event.hover.x && event.hover.y) {
            target = event.hover;
        } else {
            target = { x: event.x, y: event.y };
        }

        const connection = this.create.connection(source, target);
        this.commandStack.execute('create.connection', { connection });
    }

}
