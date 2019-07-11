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
        if (event.factory) {
            this.create.factory.set(event.factory);
        }

        const bbox = { x: event.x || 0, y: event.y || 0 };
        this.label = this.create.label(event.text, bbox);

        console.log(this.label.width, this.label.height);

        if (event.orientation) {
            this.label.x = event.orientation.x - this.label.width / 2;
            this.label.y = event.orientation.y - this.label.height / 2;
        }

        if (event.parent) {
            event.parent.labels.push(this.label);
        }
    }

    during (event) {
        this.commandStack.execute('create.label', { label: this.label });
    }

    after (event) {
        this.toolbox.activate('edit', { label: this.label });
    }

}
