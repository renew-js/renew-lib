import { event } from 'min-dom';

import { Behavior } from '../../eventBus/Behavior';


export class DetachBehavior extends Behavior {

    constructor (toolbox) {
        super();
        this.toolbox = toolbox;
    }

    before () {
        this.toolbox.activateDefault();
        event.unbind(document, 'mousedown', this.toolbox.onMouseDown, true);
        event.unbind(document, 'mousemove', this.toolbox.onMouseMove, true);
        event.unbind(document, 'mouseup', this.toolbox.onMouseUp, true);
    }

}
