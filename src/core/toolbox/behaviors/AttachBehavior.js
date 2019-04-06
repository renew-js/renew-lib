import { event } from 'min-dom';

import { Behavior } from '../../eventBus/Behavior';


export class AttachBehavior extends Behavior {

    constructor (toolbox) {
        super();
        this.toolbox = toolbox;
    }

    after () {
        this.toolbox.bindListeners();
    }

}
