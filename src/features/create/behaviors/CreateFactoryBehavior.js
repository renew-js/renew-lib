import { Behavior } from '../../../core/eventBus/Behavior';


export class CreateFactoryBehavior extends Behavior {

    constructor (create) {
        super();
        this.create = create;
    }

    set (event) {
        if (event.factory && typeof event.factory.create === 'function') {
            this.create.factory = event.factory;
        }
    }

    reset (event) {
        this.create.resetFactory();
    }

}
