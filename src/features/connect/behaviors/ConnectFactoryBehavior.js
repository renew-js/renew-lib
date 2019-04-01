import { Behavior } from '../../../core/eventBus/Behavior';


export class ConnectFactoryBehavior extends Behavior {

    constructor (connect) {
        super();
        this.connect = connect;
    }

    set (event) {
        if (event.factory && typeof event.factory.create === 'function') {
            this.connect.factory = event.factory;
        }
    }

    reset (event) {
        this.connect.resetFactory();
    }

}
