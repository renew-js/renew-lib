import { Behavior } from '../../../core/eventBus/Behavior';


export class EditActivateBehavior extends Behavior {

    constructor (directEditing) {
        super();
        this.directEditing = directEditing;
    }

    during (context) {
        if (context.element.type === 'label') {
            this.directEditing.activate(context.element);
        }
    }

}
