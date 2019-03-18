import { Behavior } from '../../../core/eventBus/Behavior';


export class MovePreviewBehavior extends Behavior {

    constructor (eventBus) {
        super();
        this.eventBus = eventBus;
    }

    before (event) {
        this.eventBus.fire('preview.init', { elements: event.elements });
    }

    during (event) {
        this.eventBus.fire('preview.move.by', { dx: event.dx, dy: event.dy });
    }

    clear () {
        this.eventBus.fire('preview.clear');
    }

}
