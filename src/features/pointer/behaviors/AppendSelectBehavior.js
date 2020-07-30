import { Behavior } from '../../../core/eventBus/Behavior';


export class AppendSelectBehavior extends Behavior {

    constructor (selection) {
        super();
        this.selection = selection;
    }

    during (context) {
        if (!context.root) {
            if (!this.selection.isSelected(context.hover)) {
                this.selection.add(context.hover);
            } else {
                this.selection.remove(context.hover);
            }
        } else {
            this.selection.clear();
        }
    }

}
