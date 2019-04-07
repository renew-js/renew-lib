import { Behavior } from '../../../core/eventBus/Behavior';


export class DetachBehavior extends Behavior {

    constructor (keyboardEvents) {
        super();
        this.keyboardEvents = keyboardEvents;
    }

    before () {
        this.keyboardEvents.unbindListeners();
    }

}
