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

    revert (context) {
    }

}
