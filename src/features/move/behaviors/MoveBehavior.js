import { Behavior } from '../../../core/eventBus/Behavior';


export class MoveBehavior extends Behavior {

    constructor (move) {
        super();
        this.move = move;
    }

    by (event) {
        this.move.elements(event.elements).by(event.dx, event.dy);
    }

    to (event) {
        this.move.elements(event.elements).to(event.x, event.y);
    }

}
