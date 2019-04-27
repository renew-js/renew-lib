import { Behavior } from '../../eventBus/Behavior';


export class RedoBehavior extends Behavior {

    constructor (commandStack) {
        super();
        this.commandStack = commandStack;
    }

    during (event) {
        this.commandStack.redo();
    }

}
