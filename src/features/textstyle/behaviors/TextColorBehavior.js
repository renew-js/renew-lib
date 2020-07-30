import { Behavior } from '../../../core/eventBus/Behavior';


export class TextColorBehavior extends Behavior {

    constructor ( textstyle, commandStack) {
        super();
        this.textstyle = textstyle,
        this.commandStack = commandStack;

    }

    during (event, attribute) {
        console.log('here', attribute);
        this.commandStack.execute('textstyle.textcolor', attribute);
    }

}
