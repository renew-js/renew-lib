import { Behavior } from '../../../core/eventBus/Behavior';


export class MoveCanvasBehavior extends Behavior {

    constructor (hand) {
        super();
        this.hand = hand;
    }

    during (event) {
        this.hand.moveBy(event.tx || 0, event.ty || 0);
    }

}
