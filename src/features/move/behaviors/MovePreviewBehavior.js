import { Behavior } from '../../../core/eventBus/Behavior';


export class MovePreviewBehavior extends Behavior {

    constructor (eventBus) {
        super();
        this.eventBus = eventBus;
    }

    before (event) {
        this.eventBus.fire('preview.init', event);
    }

    during (event) {
        this.eventBus.fire('preview.move', event);
    }

    clear () {
        this.eventBus.fire('preview.clear');
    }

}
