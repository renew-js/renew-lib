import { Behavior } from '../../../core/eventBus/Behavior';


export class ZoomOutBehavior extends Behavior {

    constructor (zoom) {
        super();
        this.zoom = zoom;
    }

    during (event) {
        this.zoom.out(event.gap);
    }

}
