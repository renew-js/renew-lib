import { Behavior } from '../../../core/eventBus/Behavior';


export class CreateElementBehavior extends Behavior {

    constructor (commandStack, create) {
        super();
        this.commandStack = commandStack;
        this.create = create;
    }

    init (event) {
        this.create.createElement(event.x, event.y);
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
                y: event.y - this.create.element.height / 2
            },
            target: event.hover,
        });
    }

    after (event) {
        this.create.element = null;
    }

}
