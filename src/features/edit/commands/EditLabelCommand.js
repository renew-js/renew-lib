import { Command } from '../../../core/command/Command';


export class EditLabelCommand extends Command {

    constructor (eventBus, canvas) {
        super();
        this.eventBus = eventBus;
        this.canvas = canvas;
    }

    execute (context) {
        const viewbox = this.canvas.viewbox();
        context.label.text = context.text;
        context.label.width = context.bounds.width / viewbox.scale;
        context.label.height = context.bounds.height / viewbox.scale;
    }

    postExecute (context) {
        const element = context.label;
        const gfx = this.canvas.getElementRegistry().getGraphics(element.id);
        const event = { elements: [ element ], element: element, gfx: gfx };

        this.canvas.getGraphicsFactory().update('shape', element, gfx);
        this.eventBus.fire('shape.changed', event);
        this.eventBus.fire('elements.changed', event);
        this.eventBus.fire('element.changed', event);
    }

    revert (context) {
    }

}
