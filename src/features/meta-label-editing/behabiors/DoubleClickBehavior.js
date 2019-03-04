import { Behavior } from '../../../util/Behavior';


export class DoubleClickBehavior extends Behavior {

    constructor (directEditing) {
        super();
        this.directEditing = directEditing;
    }

    start (event) {
        this.directEditing.activate({
            element: event.element,
            type: event.type,
        });
    }

}
