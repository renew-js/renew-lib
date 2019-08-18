import { Command } from '../../../core/command/Command';


export class EditLabelCommand extends Command {

    constructor (eventBus, graphicsFactory, elementRegistry) {
        super();
        this.eventBus = eventBus;
    }

    execute (context) {
        context.label.text = context.text;
        context.label.x = context.bounds.x;
        context.label.y = context.bounds.y;
        context.label.width = context.bounds.width;
        context.label.height = context.bounds.height;
    }

    revert (context) {
    }

}
