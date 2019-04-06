import { event } from 'min-dom';

import { Behavior } from '../../eventBus/Behavior';


export class DetachBehavior extends Behavior {

    constructor (toolbox) {
        super();
        this.toolbox = toolbox;
    }

    before () {
        this.toolbox.activateDefault();
        this.toolbox.unbindListeners();
    }

}
