import { Behavior } from '../../eventBus/Behavior';


export class SnappedBehavior extends Behavior {

    constructor (toolbox) {
        super();
        this.toolbox = toolbox;
    }

    during (event) {
        if (event.snapped) {
            this.toolbox.snapped = event.snapped;
        }
    }

}
