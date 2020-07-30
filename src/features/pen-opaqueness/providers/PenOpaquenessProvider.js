export class PenOpaquenessProvider {

    constructor (commandStack, canvas, selection,
        remove, eventBus, elementRegistry) {
        this.canvas = canvas;
        this.selection = selection;
        this.remove = remove;
        this.eventBus = eventBus;
        this.elementRegistry = elementRegistry;
        this.commandStack = commandStack;
    }

    changePenOpaqueness (attribute) {
        this.commandStack.execute('penOpaqueness.opacity', attribute);
    }

}