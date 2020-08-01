import { Behavior } from '../../../core/eventBus/Behavior';


export class FillColorBehavior extends Behavior {

    constructor (fillColor, selection, commandStack) {
        super();
        this.fillColor = fillColor;
        this.selection = selection;
        this.commandStack = commandStack;
    }

    during (event, color) {
        this.commandStack.execute('fillColor.color', color);
    }

    after (event) {}

}
