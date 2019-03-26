import { Behavior } from '../../../core/eventBus/Behavior';


export class RemoveElementsBehavior extends Behavior {

    constructor (remove) {
        super();
        this.remove = remove;
    }

    during (event) {
        this.remove.elements(event.elements);
    }

}
