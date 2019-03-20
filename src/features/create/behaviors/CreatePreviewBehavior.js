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
            this.eventBus.fire('preview.init', event);
        }
    }

    during (event) {
        this.eventBus.fire('preview.move', event);
    }

}
