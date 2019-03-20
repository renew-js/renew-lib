import { Behavior } from '../../../core/eventBus/Behavior';


export class PreviewMoveBehavior extends Behavior {

    constructor (eventBus, preview) {
        super();
        this.eventBus = eventBus;
        this.preview = preview;
    }

    during (event) {
        if (event.dx && event.dy) {
            this.by(event);
        } else if (event.dx !== 0 && event.dy !== 0) {
            this.to(event);
        }
    }

    to (event) {
        // this.eventBus.fire('snapping.snap', event);
        this.preview.moveTo(event.x, event.y);
    }

    by (event) {
        // this.eventBus.fire('snapping.snap', event);
        this.preview.moveBy(event.dx, event.dy);
    }

}
