import { event } from 'min-dom';

import { Behavior } from '../../eventBus/Behavior';


export class AttachBehavior extends Behavior {

    constructor (toolbox) {
        super();
        this.toolbox = toolbox;
    }

    after () {
        event.bind(
            document,
            'mousedown',
            this.toolbox.onMouseDown.bind(this.toolbox),
            true
        );
        event.bind(
            document,
            'mousemove',
            this.toolbox.onMouseMove.bind(this.toolbox),
            true
        );
        event.bind(
            document,
            'mouseup',
            this.toolbox.onMouseUp.bind(this.toolbox),
            true
        );
    }

}
