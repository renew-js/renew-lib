import { Behavior } from '../../../core/eventBus/Behavior';


export class AttachBehavior extends Behavior {

    constructor (keyboardEvents) {
        super();
        this.keyboardEvents = keyboardEvents;
    }

    after () {
        this.keyboardEvents.bindListeners();
    }

}
