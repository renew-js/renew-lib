import { Behavior } from '../../../core/eventBus/Behavior';


export class MoveSelectionBehavior extends Behavior {

    constructor (move, selection) {
        super();
        this.move = move;
        this.selection = selection;
    }

    during (event) {
        if (!this.selection.empty()) {
            this.move.elements(this.selection.get()).by(event.dx, event.dy);
        }
    }

}
