export class SaveLabelCommand {
    constructor (eventBus, commandStack) {
        this.eventBus = eventBus;
        this.commandStack = commandStack;
    }

    preExecute (context) {
        if (!context.element.metaObject[context.type]) {
            const shape = {
                id: context.element.id + '_label_' + context.type,
                text: context.text,
                metaObject: context.element.metaObject,
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
                }
            });
        } else {
            //context.element.metaObject[context.type];
        }
    }

    execute (context) {
        context.element.metaObject[context.type] = context.text;
    }

    revert (context) {
        context.element.metaObject[context.type] = context.old;
    }

    postExecute (context) {
        console.log(context.box);
    }

    isEmpty (text) {
        return !text.trim();
    }
}
