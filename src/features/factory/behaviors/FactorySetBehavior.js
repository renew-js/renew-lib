import { Behavior } from '../../../core/eventBus/Behavior';


export class FactorySetBehavior extends Behavior {

    constructor (factory) {
        super();
        this.factory = factory;
    }

    during (event) {
        if (event.factory) {
            this.factory.set(event.factory);
        }
    }

}
