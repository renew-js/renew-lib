import { Behavior } from '../../../core/eventBus/Behavior';


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
