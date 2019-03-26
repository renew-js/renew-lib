import { Behavior } from '../../../core/eventBus/Behavior';


export class SnappingInitBehavior extends Behavior {

    constructor (snapping) {
        super();
        this.snapping = snapping;
    }

    during (event) {
        this.snapping.init();
    }

}
