export class MetaLabelEditing {
    constructor (eventBus, directEditing, metaPluginManager, orientation) {
        this.pluginManager = metaPluginManager;
        this.directEditing = directEditing;
        this.orientation = orientation;

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
        const style = this.pluginManager.getStyleSheetStyle(
            context.element.model,
            context.type
        );

        const position = this.orientation.position(
            context.element,
            style.orientation
        );
        return {
            text: context.element[context.type] || '',
            bounds: {
                x: position.x - style.boundingBox.width/2
                    + style.orientation.margin.left
                    - style.orientation.margin.right,
                y: position.y - style.boundingBox.height/2
                    + style.orientation.margin.top
                    - style.orientation.margin.bottom,
                width: style.boundingBox.width,
                height: style.boundingBox.height,
            },
            style: {
                border: '1px dashed',
            },
            options: {
                resizable: true,
                centerVertically: true
            }
        };
    }

    update (context, text, old, box) {
        context.element[context.type] = text.trim().replace(/\n$/gi, '');
    }

    isEmpty (text) {
        return !text.trim();
    }
}
