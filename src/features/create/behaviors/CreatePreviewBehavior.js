import { Behavior } from '../../../core/eventBus/Behavior';


export class CreatePreviewBehavior extends Behavior {

    constructor (eventBus, create) {
        super();
        this.eventBus = eventBus;
        this.create = create;
    }

    before (event) {
        if (!this.create.element) {
            this.eventBus.fire('create.element.init', event);

            event.elements = this.create.element;
            event.elements.x -= event.elements.width/2;
            event.elements.y -= event.elements.height/2;
            this.eventBus.fire('preview.init', event);
        }
    }

    during (event) {
        this.eventBus.fire('preview.move.to', event);
    }

}
