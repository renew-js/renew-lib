import { Behavior } from '../../../core/eventBus/Behavior';


export class MoveElementsBehavior extends Behavior {

    constructor (selection) {
        super();
        this.selection = selection;
    }

    after (event) {
        this.selection.updateBBox();
    }

}
