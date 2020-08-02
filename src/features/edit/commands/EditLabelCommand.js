import { Command } from '../../../core/command/Command';


export class EditLabelCommand extends Command {

    constructor (eventBus, graphicsFactory, elementRegistry) {
        super();
        this.eventBus = eventBus;
        this.graphicsFactory = graphicsFactory;
        this.elementRegistry = elementRegistry;
    }

    execute (context) {
        console.log('here');
        context.label.text = context.text;
        context.label.x = context.bounds.x;
        context.label.y = context.bounds.y;
        context.label.width = context.bounds.width;
        context.label.height = context.bounds.height;
    }

    postExecute (context) {
        console.log('here');
        const element = context.label;
        const gfx = this.elementRegistry.getGraphics(element.id);
        const event = { elements: [ element ], element: element, gfx: gfx };

        this.graphicsFactory.update('shape', element, gfx);
        this.eventBus.fire('shape.changed', event);
        this.eventBus.fire('elements.changed', event);
        this.eventBus.fire('element.changed', event);
    }

    revert (context) {
        console.log('here');
    }

}
