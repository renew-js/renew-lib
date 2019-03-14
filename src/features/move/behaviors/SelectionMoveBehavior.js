import { Behavior } from '../../../core/eventBus/Behavior';


export class SelectionMoveBehavior extends Behavior {

    constructor (commandStack) {
        super();
        this.commandStack = commandStack;
    }

    during (event) {

    }

}
