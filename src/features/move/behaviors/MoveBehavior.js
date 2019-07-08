import { Behavior } from '../../../core/eventBus/Behavior';


export class MoveBehavior extends Behavior {

    constructor (move) {
        super();
        this.move = move;
    }

    by (event) {
        const elements = event.elements || [ event.element ];
        this.move.elements(elements).by(event.dx, event.dy);
    }

    to (event) {
        const elements = event.elements || [ event.element ];
        this.move.elements(elements).to(event.x, event.y);
    }

}
