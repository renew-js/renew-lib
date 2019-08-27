import { Provider } from '../../../core/Provider';


export class EditProvider extends Provider {

    constructor (directEditing) {
        super();
        this.directEditing = directEditing;
        this.directEditing.registerProvider(this);

        this.label = null;
    }

    isActive () {
        return this.directEditing.isActive();
    }

    activate (context) {
        const viewbox = this.canvas.viewbox();
        const element = context.element;
        this.label = element;
        this.label.options = {
            align: 'center-middle',
            bounds: {
                x: (element.x - viewbox.x) * viewbox.scale,
                y: (element.y - viewbox.y) * viewbox.scale,
                width: element.width * viewbox.scale,
                height: element.height * viewbox.scale,
            },
            style: {
                border: '2px dashed #ccc',
            },
            text: element.text,
            options: {
                forceUpdate: true,
                resizable: true,
                centerVertically: true,
                autoActivate: true,
            },
        };

        return this.label.options;
    }

    update (context, text, old, bounds) {
        this.label.options.bounds = bounds;

        const label = context.element;

        if (old !== text
            || bounds.height !== context.height
            || bounds.width !== context.width
        ) {
            this.commandStack.execute('edit.label', {
                label,
                text,
                old,
                bounds,
            });
        }

        this.canvas.updateGraphics(this.label);
    }

    focus () {
        const editingContent = this.directEditing._textbox.parent.firstChild;
        if (!editingContent.innerHTML) {
            editingContent.innerHTML = '<br>';
        }
        editingContent.focus();
        editingContent.focus();
    }

}
