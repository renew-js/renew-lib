import { Behavior } from '../../../core/eventBus/Behavior';


export class ConnectElementsBehavior extends Behavior {

    constructor (commandStack, connect) {
        super();
        this.commandStack = commandStack;
        this.connect = connect;

        this.connection = null;
    }

    before (event) {
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

        this.connection = this.connect.connection(source, target);
    }

    during (event) {
        event.connection = this.connection;
        this.commandStack.execute('connect.elements', event);
    }

}
