import { Behavior } from '../../../core/eventBus/Behavior';


export class SelectionAddBehavior extends Behavior {

    constructor (selection) {
        super();
        this.selection = selection;
    }

    during (event) {
        this.selection.add(event.element || event.elements);
    }

}
