import { Behavior } from '../../../core/eventBus/Behavior';


export class ZoomInBehavior extends Behavior {

    constructor (zoom) {
        super();
        this.zoom = zoom;
    }

    during (event) {
        this.zoom.in(event.gap);
    }

}
