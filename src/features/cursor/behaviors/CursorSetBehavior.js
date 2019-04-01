import { Behavior } from '../../../core/eventBus/Behavior';


export class CursorSetBehavior extends Behavior {

    constructor (cursor) {
        super();
        this.cursor = cursor;
    }

    during (event) {
        this.cursor.set(event.cursor);
    }

}
