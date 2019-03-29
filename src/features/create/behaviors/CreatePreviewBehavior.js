import { Behavior } from '../../../core/eventBus/Behavior';


export class CreatePreviewBehavior extends Behavior {

    constructor (eventBus, create) {
        super();
        this.eventBus = eventBus;
        this.create = create;

        this.shape = null;
    }

    init (event) {
        this.shape = this.create.element();
        this.eventBus.fire('preview.init', { element: this.shape });
    }

    before (event) {

    }

    during (event) {
        this.eventBus.fire('preview.move', event);
    }

    clear (event) {
        this.eventBus.fire('preview.clear', event);
    }

}
