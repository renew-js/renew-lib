import { mid } from 'diagram-js/lib/features/snapping/SnapUtil';
import { Behavior } from '../../../core/eventBus/Behavior';


export class SnapBehavior extends Behavior {

    constructor (eventBus, snapping) {
        super();
        this.eventBus = eventBus;
        this.snapping = snapping;
    }

    init (event) {
        if (event.context.elements) {
            event.context.elements.forEach((element) => {
                const center = mid(element);
                this.snapping.snapOrigins.push({
                    x: center.x - event.x,
                    y: center.y - event.y,
                });
            });
        }
    }

    during (event) {
        if (event.context.elements) {
            event.snapped = this.snapping.snap(event);
            this.eventBus.fire('snapping.snapped', event);
        }
    }

    stop (event) {
        this.snapping.stop();
    }

}
