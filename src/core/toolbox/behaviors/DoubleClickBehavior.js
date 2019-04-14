import { Behavior } from '../../eventBus/Behavior';


export class DoubleClickBehavior extends Behavior {

    constructor (toolbox) {
        super();
        this.toolbox = toolbox;
    }

    during (event) {
        this.toolbox.onDoubleClick(event);
    }

}
