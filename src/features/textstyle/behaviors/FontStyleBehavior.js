import { Behavior } from '../../../core/eventBus/Behavior';


export class FontStyleBehavior extends Behavior {

    constructor ( textstyle, commandStack) {
        super();
        this.textstyle = textstyle,
        this.commandStack = commandStack;

    }

    during (event, attribute) {
        console.log('here', attribute);
        this.commandStack.execute('textstyle.fontstyle', attribute);
    }

}
