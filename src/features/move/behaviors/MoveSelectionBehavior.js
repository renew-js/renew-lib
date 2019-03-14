import { Behavior } from '../../../core/eventBus/Behavior';


export class MoveSelectionBehavior extends Behavior {

    constructor (commandStack, selection) {
        super();
        this.commandStack = commandStack;
        this.selection = selection;
    }

    during (event) {
        if (!this.selection.empty()) {
            this.commandStack.execute('move.elements', {
                elements: this.selection.get(),
                dx: event.dx,
                dy: event.dy,
            });
        }
    }

}
