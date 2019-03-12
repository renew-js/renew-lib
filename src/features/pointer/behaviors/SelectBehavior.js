import { Behavior } from '../../../core/eventBus/Behavior';


export class SelectBehavior extends Behavior {

    constructor (selection) {
        super();
        this.selection = selection;
    }

    during (context) {
        if (!context.root) {
            if (!this.selection.isSelected(context.hover)) {
                this.selection.select(context.hover);
            }
        } else {
            this.selection.unselect();
        }
    }

}
