import { Behavior } from '../../../core/eventBus/Behavior';


export class EditCompleteBehavior extends Behavior {

    constructor (directEditing) {
        super();
        this.directEditing = directEditing;
    }

    during (event) {
        this.directEditing.complete();
    }

}
