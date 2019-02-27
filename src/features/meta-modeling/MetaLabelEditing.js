export class MetaLabelEditing {
    constructor (eventBus, directEditing, metaPluginManager) {
        this.pluginManager = metaPluginManager;
        this.directEditing = directEditing;

        this.directEditing.registerProvider(this);

        eventBus.on('element.dblclick', (event) => {
            this.onActivateDirectEditing(event, event.element.metaLabels[0]);
            // TODO: unselect selection
        });
        eventBus.on('contextPad.text.click', (event) => {
            console.log(event);
            this.onActivateDirectEditing(event, event.textType);
        });
        eventBus.on('element.mousedown', () => {
            this.onFinish();
        });
    }

    onActivateDirectEditing (event, type) {
        this.directEditing.activate({ element: event.element, type: type });
    }

    onFinish () {
        if (this.directEditing.isActive()) {
            this.directEditing.complete();
        }
    }

    activate (context) {
        return {
            text: context.element[context.type] || '',
            bounds: {
                x: context.element.x,
                y: context.element.y,
                width: context.element.width,
                height: context.element.height,
            },
            style: {
                border: '1px dashed',
            },
            options: {
                resizable: true,
                centerHorizontally: true,
                centerVertically: true
            }
        };
    }

    update (context, text, old, box) {
        context.element[context.type] = text;
    }

    isEmpty (text) {
        return !text.trim();
    }
}
