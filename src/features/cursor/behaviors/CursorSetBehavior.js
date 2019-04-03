import { Behavior } from '../../../core/eventBus/Behavior';


export class CursorSetBehavior extends Behavior {

    constructor (cursor) {
        super();
        this.cursor = cursor;
    }

    during (event) {
        this.cursor.set(event.cursor);
    }

    pointer (event) {
        this.cursor.set('pointer');
    }

    grabbing (event) {
        this.cursor.set('grabbing');
    }

}
