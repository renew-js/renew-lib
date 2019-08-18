export class EditProvider {

    constructor (canvas, commandStack, directEditing) {
        this.canvas = canvas;
        this.commandStack = commandStack;
        this.directEditing = directEditing;
        this.directEditing.registerProvider(this);

        this.label = null;
    }

    isActive () {
        return this.directEditing.isActive();
    }

    activate (context) {
        const element = context.element;
        this.label = element;
        this.label.options = {
            align: 'center-middle',
            box: {
                x: element.x,
                y: element.y,
                width: element.width,
                height: element.height,
            },
            bounds: {
                x: element.x,
                y: element.y,
                width: element.width,
                height: element.height,
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

    update (element, text, old, bounds) {
        if (old !== text) {
            this.commandStack.execute('edit.label', {
                label: this.label,
                text: text,
                old: old,
                bounds: bounds,
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
