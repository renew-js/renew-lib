import { Behavior } from '../../../core/eventBus/Behavior';


export class CreateShapeBehavior extends Behavior {

    constructor (eventBus, commandStack, create, canvas) {
        super();
        this.eventBus = eventBus;
        this.commandStack = commandStack;
        this.create = create;
        this.canvas = canvas;

        this.shape = null;
    }

    before (event) {
        this.shape = this.create.shape(event.x, event.y);
        this.shape.width = event.width || this.shape.width;
        this.shape.height = event.height || this.shape.height;
    }

    during (event) {
        this.commandStack.execute('create.shape', { shape: this.shape });
    }

    center () {
        this.shape.x -= this.shape.width / 2;
        this.shape.y -= this.shape.height / 2;
        this.commandStack.execute('create.shape', { shape: this.shape });
    }

    after (event) {
        this.eventBus.fire('selection.add', { element: this.shape });
    }

}
