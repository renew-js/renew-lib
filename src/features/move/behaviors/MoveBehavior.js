import { Behavior } from '../../../core/eventBus/Behavior';


export class MoveBehavior extends Behavior {

    constructor (move) {
        super();
        this.move = move;
    }

    during (event) {
        this.move.elements(event.elements).by(event.dx, event.dy);
    }

}
