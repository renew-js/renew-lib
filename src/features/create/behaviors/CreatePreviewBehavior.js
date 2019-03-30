import { Behavior } from '../../../core/eventBus/Behavior';


export class CreatePreviewBehavior extends Behavior {

    constructor (eventBus, create) {
        super();
        this.eventBus = eventBus;
        this.create = create;

        this.shape = null;
    }

    init (event) {
        this.shape = this.create.element(event.x, event.y);
        this.shape.x -= this.shape.width / 2;
        this.shape.y -= this.shape.height / 2;
        event.element = this.shape;
        event.elements = [ this.shape ];
        this.eventBus.fire('preview.init', event);
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
