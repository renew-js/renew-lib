export class FillOpaquenessProvider {

    constructor (commandStack, canvas, selection,
        remove, eventBus, elementRegistry) {
        this.canvas = canvas;
        this.selection = selection;
        this.remove = remove;
        this.eventBus = eventBus;
        this.elementRegistry = elementRegistry;
        this.commandStack = commandStack;
    }

    changeFillOpaqueness (attribute) {
        this.commandStack.execute('fillOpaqueness.opacity', attribute);
    }

}
