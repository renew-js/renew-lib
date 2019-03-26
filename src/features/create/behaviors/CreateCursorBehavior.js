import { set, unset } from 'diagram-js/lib/util/Cursor';
import { Behavior } from '../../../core/eventBus/Behavior';


export class CreateCursorBehavior extends Behavior {

    constructor () {
        super();
    }

    grabbing (event) {
        set('grabbing');
    }

    unset (event) {
        unset();
    }

}
