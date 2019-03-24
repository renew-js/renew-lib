import { Behavior } from '../../../core/eventBus/Behavior';


export class SnappingClearBehavior extends Behavior {

    constructor (snapping) {
        super();
        this.snapping = snapping;
    }

    during (event) {
        this.snapping.hide();
    }

}
