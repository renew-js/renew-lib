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

    grab (event) {
        this.cursor.set('grab');
    }

    grabbing (event) {
        this.cursor.set('grabbing');
    }

    nwse (event) {
        this.cursor.set('nwse-resize');
    }

    nesw (event) {
        this.cursor.set('nesw-resize');
    }

    ns (event) {
        this.cursor.set('ns-resize');
    }

    ew (event) {
        this.cursor.set('ew-resize');
    }

}
