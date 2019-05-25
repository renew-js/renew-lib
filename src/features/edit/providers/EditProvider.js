export class EditProvider {

    constructor (commandStack, directEditing) {
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
                width: element.width - 4,
                height: element.height + 4,
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
                resizable: true,
                centerVertically: true,
                autoActivate: true,
            },
        };

        return this.label.options;
    }

    update (element, text, old, bounds) {
        this.commandStack.execute('edit.label', {
            label: this.label,
            text: text,
            old: old,
            bounds: bounds,
        });
    }

}
