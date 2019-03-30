import { Behavior } from '../../../core/eventBus/Behavior';


export class PreviewMoveBehavior extends Behavior {

    constructor (eventBus, preview) {
        super();
        this.eventBus = eventBus;
        this.preview = preview;
    }

    during (event) {
        if (this.preview.visuals) {
            if (!event.context) {
                event.context = { };
            }
            event.context.elements = this.preview.visuals.elements;
            this.eventBus.fire('snapping.snap', event);
            this.preview.move(event.dx, event.dy);
        }
    }

}
