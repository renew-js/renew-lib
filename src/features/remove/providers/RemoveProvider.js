export class RemoveProvider {

    constructor (commandStack) {
        this.commandStack = commandStack;
    }

    elements (elements) {
        this.commandStack.execute('remove.elements', { elements: elements });
    }

}
