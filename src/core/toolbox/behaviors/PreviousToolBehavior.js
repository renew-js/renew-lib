import { Behavior } from '../../eventBus/Behavior';


export class PreviousToolBehavior extends Behavior {

    constructor (toolbox) {
        super();
        this.toolbox = toolbox;
    }

    during (event) {
        this.toolbox.activatePrevious();
    }

}
