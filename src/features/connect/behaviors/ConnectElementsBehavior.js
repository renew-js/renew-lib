import { Behavior } from '../../../core/eventBus/Behavior';


export class ConnectElementsBehavior extends Behavior {

    constructor (commandStack, connect) {
        super();
        this.commandStack = commandStack;
        this.connect = connect;
    }

}
