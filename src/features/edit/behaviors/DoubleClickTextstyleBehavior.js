import { Behavior } from '../../../core/eventBus/Behavior';


export class DoubleClickTextstyleBehavior extends Behavior {

    constructor ( edit, commandStack) {
        super();
        this.edit = edit;
    }

    during (event, attribute) {
        this.edit.setDblClickedActivationBool(attribute);
    }

}
