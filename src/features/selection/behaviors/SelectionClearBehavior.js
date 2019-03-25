import { Behavior } from '../../../core/eventBus/Behavior';


export class SelectionClearBehavior extends Behavior {

    constructor (selection) {
        super();
        this.selection = selection;
    }

    during (event) {
        this.selection.clear();
    }

}
