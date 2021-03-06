import { Behavior } from '../../../core/eventBus/Behavior';


export class PreviewInitBehavior extends Behavior {

    constructor (eventBus, preview) {
        super();
        this.eventBus = eventBus;
        this.preview = preview;
    }

    during (event) {
        event.elements = event.elements || [ event.element ];
        this.preview.createVisuals(event.elements);
    }

    after (event) {
        if (this.preview.visuals) {
            if (!event.context) {
                event.context = { };
            }
            event.context.elements = this.preview.visuals.elements;
            this.eventBus.fire('snapping.snap.init', event);
        }
    }

}
