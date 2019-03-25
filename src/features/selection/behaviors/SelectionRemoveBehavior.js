import { Behavior } from '../../../core/eventBus/Behavior';


export class SelectionRemoveBehavior extends Behavior {

    constructor (selection) {
        super();
        this.selection = selection;
    }

    during (event) {
        this.selection.remove(event.element || event.elements);
    }

}
