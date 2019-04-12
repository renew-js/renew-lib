import { Behavior } from '../../../core/eventBus/Behavior';


export class ActivateDefaultBehavior extends Behavior {

    constructor (toolbox) {
        super();
        this.toolbox = toolbox;
    }

    during (event) {
        this.toolbox.activateDefault();
    }

}
