import { Behavior } from '../../../core/eventBus/Behavior';


export class SelectAllBehavior extends Behavior {

    constructor (selection) {
        super();
        this.selection = selection;
    }

    during (event) {
        this.selection.selectAll();
    }

}
