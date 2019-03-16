import { Behavior } from '../../../core/eventBus/Behavior';


export class MoveBehavior extends Behavior {

    constructor (move) {
        super();
        this.move = move;
    }

    during (event) {
        if (event.elements) {
            if (event.dx && event.dy) {
                this.move.elements(event.elements).by(event.dx, event.dy);
            } else if (event.x && event.y) {
                this.move.elements(event.elements).to(event.x, event.y);
            }
        }
    }

}
