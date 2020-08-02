import { Behavior } from '../../../core/eventBus/Behavior';


export class FontSizeBehavior extends Behavior {

    constructor ( textstyle, commandStack) {
        super();
        this.textstyle = textstyle,
        this.commandStack = commandStack;

    }

    during (event, fontsize) {
        console.log('here', fontsize);
        this.commandStack.execute('textstyle.fontsize', fontsize);
    }

}
