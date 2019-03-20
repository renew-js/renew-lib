import { Behavior } from '../../../core/eventBus/Behavior';


export class PreviewInitBehavior extends Behavior {

    constructor (eventBus, preview) {
        super();
        this.eventBus = eventBus;
        this.preview = preview;
    }

    during (event) {
        if (!this.preview.visuals) {
            this.preview.createVisuals(event.elements);
        }
    }

    after (event) {
        if (event.context) {
            event.context.shape = Array.isArray(event.elements) ?
                event.elements[0] : event.elements;
        }
        this.eventBus.fire('snapping.snap.init', event);
    }

}
