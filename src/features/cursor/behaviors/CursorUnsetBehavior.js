import { Behavior } from '../../../core/eventBus/Behavior';


export class CursorUnsetBehavior extends Behavior {

    constructor (cursor) {
        super();
        this.cursor = cursor;
    }

    during (event) {
        this.cursor.unset();
    }

}
