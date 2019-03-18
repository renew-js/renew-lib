import CommandHandler from 'diagram-js/lib/command/CommandHandler';


export class SaveLabelCommand extends CommandHandler {

    constructor (eventBus, commandStack) {
        super();
        this.eventBus = eventBus;
        this.commandStack = commandStack;
    }

    preExecute (context) {
        const shape = {
            id: context.element.id + '_label_' + context.type,
            text: context.text,
            type: context.element.model + ':' + context.type,
            model: context.element.model,
            metaType: context.type,
            width: context.box.width,
            height: context.box.height,
        };

        context.element.labels.push(shape);

        this.commandStack.execute('label.create', {
            shape: shape,
            labelTarget: context.element,
            parent: context.element.parent,
            position: {
                x: context.box.x,
                y: context.box.y,
            },
        });
    }

    execute (context) {
    }

    revert (context) {
    }

    postExecute (context) {
        console.log('log', context.box);
    }

    isEmpty (text) {
        return !text.trim();
    }

}
