import { Behavior } from '../../../core/eventBus/Behavior';


export class PreviewMoveBehavior extends Behavior {

    constructor (eventBus, preview) {
        super();
        this.eventBus = eventBus;
        this.preview = preview;
    }

    during (event) {
        this.preview.move(event.dx, event.dy);
    }

}
