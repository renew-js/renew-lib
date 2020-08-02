import { Behavior } from '../../../core/eventBus/Behavior';


export class FontFamilyBehavior extends Behavior {

    constructor ( textstyle, commandStack) {
        super();
        this.textstyle = textstyle,
        this.commandStack = commandStack;

    }

    during (event, fontfamily) {
        console.log('here', fontfamily);
        this.commandStack.execute('textstyle.fontfamily', fontfamily);
    }

}
