export class PenColorProvider {

    constructor (commandStack, canvas, selection,
        remove, eventBus, elementRegistry) {
        this.canvas = canvas;
        this.selection = selection;
        this.remove = remove;
        this.eventBus = eventBus;
        this.elementRegistry = elementRegistry;
        this.commandStack = commandStack;
    }

    penColor (color) {

    }

}
