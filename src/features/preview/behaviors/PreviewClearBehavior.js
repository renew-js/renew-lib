import { Behavior } from '../../../core/eventBus/Behavior';


export class PreviewClearBehavior extends Behavior {

    constructor (eventBus, preview) {
        super();
        this.eventBus = eventBus;
        this.preview = preview;
    }

    during (event) {
        this.preview.clearVisuals();
        this.eventBus.fire('snapping.snap.stop', event);
    }

}
