import { Behavior } from '../../../core/eventBus/Behavior';


export class PenColorBehavior extends Behavior {

    constructor (penColor, selection, commandStack) {
        super();
        this.penColor = penColor;
        this.selection = selection;
        this.commandStack = commandStack;
    }

    during (event, color) {
        this.commandStack.execute('setPencolor.color', color);
    }

    after (event) {}

}
