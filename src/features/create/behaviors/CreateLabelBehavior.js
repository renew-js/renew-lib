import { Behavior } from '../../../core/eventBus/Behavior';


export class CreateLabelBehavior extends Behavior {

    constructor (eventBus, canvas, commandStack, create, toolbox) {
        super();
        this.eventBus = eventBus;
        this.canvas = canvas;
        this.commandStack = commandStack;
        this.create = create;
        this.toolbox = toolbox;

        this.label = null;
    }

    before (event) {
        if (event.factory) {
            this.create.factory.set(event.factory);
        }
        const bbox = { x: event.x, y: event.y, width: 150, height: 50 };
        if (event.parent && event.parent.waypoints) {
            const connectionBBox = this.canvas.getBBox(event.parent);
            event.orientation.x = connectionBBox.x + connectionBBox.width / 2;
            event.orientation.y = connectionBBox.y + connectionBBox.height / 2;
        }
        if (event.orientation) {
            bbox.x = event.orientation.x - 75;
            bbox.y = event.orientation.y - 25;
        }
        this.label = this.create.label(event.text, bbox);
    }

    during (event) {
        this.commandStack.execute('create.label', { label: this.label });
    }

    after (event) {
        if (event.parent) {
            event.parent.labels.push(this.label);
            this.label.parent = event.parent;
        }

        this.toolbox.activate('edit', { label: this.label });
    }

}
