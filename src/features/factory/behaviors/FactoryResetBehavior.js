import { Behavior } from '../../../core/eventBus/Behavior';


export class FactoryResetBehavior extends Behavior {

    constructor (factory) {
        super();
        this.factory = factory;
    }

    during (event) {
        this.factory.reset();
    }

}
