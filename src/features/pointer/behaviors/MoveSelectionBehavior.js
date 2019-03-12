import { Behavior } from '../../../core/eventBus/Behavior';


export class MoveSelectionBehavior extends Behavior {

    constructor (policy, selection) {
        super();
        this.policy = policy;
        this.selection = selection;
    }

    during (context) {

    }

}
