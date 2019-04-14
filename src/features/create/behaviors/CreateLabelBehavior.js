import { Behavior } from '../../../core/eventBus/Behavior';


export class CreateLabelBehavior extends Behavior {

    constructor (eventBus, commandStack, create, toolbox) {
        super();
        this.eventBus = eventBus;
        this.commandStack = commandStack;
        this.create = create;
        this.toolbox = toolbox;

        this.label = null;
    }

    before (event) {
        this.label = this.create.label(event.text, { x: event.x, y: event.y });
    }

    during (event) {
        this.commandStack.execute('create.label', { label: this.label });
    }

    after (event) {
        this.toolbox.activate('edit', { label: this.label });
    }

}
