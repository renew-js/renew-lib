import { Behavior } from '../../../core/eventBus/Behavior';


export class CleanUpBehavior extends Behavior {

    constructor (create) {
        super();
        this.create = create;
    }

    before (context) { }

    during (context) {
        this.create.factory = null;
        this.create.config = null;
        this.create.preview = null;
    }

    after (context) { }

}
