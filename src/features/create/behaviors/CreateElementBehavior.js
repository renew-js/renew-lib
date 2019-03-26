import { Behavior } from '../../../core/eventBus/Behavior';


export class CreateElementBehavior extends Behavior {

    constructor (eventBus, commandStack, create) {
        super();
        this.eventBus = eventBus;
        this.commandStack = commandStack;
        this.create = create;
    }

    init (event) {
        event.elements = this.create.createElement(
            event.x - event.dx,
            event.y - event.dy
        );
    }

    before (event) {
        if (!this.create.element) {
            this.init(event);
        }
    }

    during (event) {
        this.commandStack.execute('tool.shape.create', {
            shape: this.create.element,
            position: {
                x: event.x - this.create.element.width / 2,
                y: event.y - this.create.element.height / 2,
            },
            target: event.hover,
        });
    }

    after (event) {
        event.elements = this.create.element;
        this.eventBus.fire('selection.add', event);
        this.create.element = null;
    }

}
