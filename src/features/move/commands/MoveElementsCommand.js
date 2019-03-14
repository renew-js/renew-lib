import { Command } from '../../../core/command/Command';


export class MoveElementsCommand extends Command {

    constructor (eventBus, graphicsFactory, elementRegistry) {
        super();
        this.eventBus = eventBus;
        this.graphicsFactory = graphicsFactory;
        this.elementRegistery = elementRegistry;
    }

    execute (context) {
        context.elements.forEach((element) => {
            if (element.type === 'Shape') {
                element.x += context.dx;
                element.y += context.dy;
                this.graphicsFactory.update(
                    'shape',
                    element,
                    this.elementRegistery.getGraphics(element.id)
                );
                this.eventBus.fire('element.changed', { element: element });
            }
        });
    }

    revert (context) {
        // TODO: ...
    }
}
