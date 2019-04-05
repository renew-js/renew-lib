import { Behavior } from '../../../core/eventBus/Behavior';


export class CreateLabelBehavior extends Behavior {

    constructor (commandStack, create) {
        super();
        this.commandStack = commandStack;
        this.create = create;

        this.label = null;
    }

    before (event) {
        this.label = this.create.label(event.text, { x: event.x, y: event.y });
    }

    during (event) {
        this.commandStack.execute('create.label', { label: this.label });
    }

}
