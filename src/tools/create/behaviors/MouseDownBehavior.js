import { Behavior } from '../../../core/eventBus/Behavior';


export class MouseDownBehavior extends Behavior {
    constructor (create) {
        super();
        this.create = create;
    }

    during (context) {

    }
}
