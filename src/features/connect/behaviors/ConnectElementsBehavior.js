import { Behavior } from '../../../core/eventBus/Behavior';


export class ConnectElementsBehavior extends Behavior {

    constructor (commandStack, connect) {
        super();
        this.commandStack = commandStack;
        this.connect = connect;
    }

    before (event) {
        event.connection = this.connect.connection(event, event);
    }

    during (event) {
        this.commandStack.execute('connect.elements', event);
    }

}
