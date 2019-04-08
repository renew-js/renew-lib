export class EditProvider {

    constructor (directEditing) {
        this.directEditing = directEditing;
        this.directEditing.registerProvider(this);

        this.label = null;
    }

    isActive () {
        return this.directEditing.isActive();
    }

    activate (element) {
        this.label = element;

        return {
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
            },
        };
    }

    update (element, text, old, bounds) {
        console.log('TODO', element, text, old, bounds);
    }

}
