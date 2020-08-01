import { Behavior } from '../../../core/eventBus/Behavior';


export class EditUpdateBehavior extends Behavior {

    constructor (directEditing) {
        super();
        this.directEditing = directEditing;
    }

    during (event) {
        this.directEditing.activate(event);
        this.directEditing.complete();
    }

}
