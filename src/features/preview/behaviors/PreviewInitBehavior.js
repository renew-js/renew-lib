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
            this.preview.move(event.dx, event.dy);
        }
    }

    after (event) {
        if (event.context) {
            event.context.elements = this.preview.visuals.elements;
            this.eventBus.fire('snapping.snap.init', event);
        }
    }

}
