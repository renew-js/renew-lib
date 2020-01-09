import { Behavior } from '../../../core/eventBus/Behavior';


export class ZoomResetBehavior extends Behavior {

    constructor (zoom) {
        super();
        this.zoom = zoom;
    }

    during (event) {
        this.zoom.reset();
    }

}
