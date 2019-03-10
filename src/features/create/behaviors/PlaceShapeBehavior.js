import { Behavior } from '../../../core/eventBus/Behavior';


export class PlaceShapeBehavior extends Behavior {
    constructor (eventBus, toolbox, commandStack, create) {
        super();
        this.eventBus = eventBus;
        this.toolbox = toolbox;
        this.commandStack = commandStack;
        this.create = create;

        this.context = null;
        this.shape = null;
    }

    before (context) {
        this.context = {
            shape: this.create.factory.createElement(this.create.config.type),
            start: {
                x: context.sx,
                y: context.sy,
            },
            position: {
                x: context.sx || context.x,
                y: context.sy || context.y,
            },
            parent: context.hover,
            event: context.originalEvent,
        };
    }

    during (context) {
        this.shape = this.commandStack.execute('tool.shape.create', this.context);
    }

    after (context) {
        this.create.clearPreview();
        if (!context.originalEvent.shiftKey) {
            this.toolbox.activatePrevious();
        }
    }
}
