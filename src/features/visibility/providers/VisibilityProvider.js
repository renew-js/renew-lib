export class VisibilityProvider {

    constructor (commandStack, canvas, selection,
        remove, eventBus, elementRegistry) {
        this.canvas = canvas;
        this.selection = selection;
        this.remove = remove;
        this.eventBus = eventBus;
        this.elementRegistry = elementRegistry;
        this.commandStack = commandStack;
    }

    changeVisibility (attribute) {
        console.log(attribute);
    }

}
