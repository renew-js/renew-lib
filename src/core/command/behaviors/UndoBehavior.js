import { Behavior } from '../../eventBus/Behavior';


export class UndoBehavior extends Behavior {

    constructor (commandStack) {
        super();
        this.commandStack = commandStack;
    }

    during (event) {
        this.commandStack.undo();
    }

}
