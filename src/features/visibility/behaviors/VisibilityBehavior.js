import { Behavior } from '../../../core/eventBus/Behavior';


export class VisibilityBehavior extends Behavior {

    constructor (visibility, selection, commandStack) {
        super();
        this.visibility = visibility;
        this.selection = selection;
        this.commandStack = commandStack;
    }

    during (event, attribute) {
        this.visibility.changeVisibility(attribute);
        this.commandStack.execute('visibility.attribute', attribute);

    }

    after (event) {}

}
