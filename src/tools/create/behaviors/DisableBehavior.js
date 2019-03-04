import { Behavior } from '../../../core/Behavior';


export class DisableBehavior extends Behavior {

    constructor (create) {
        super();
        this.create = create;
    }

    before (context) { }

    during (context) { }

    after (context) { }

}
