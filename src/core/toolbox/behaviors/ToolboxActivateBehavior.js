import { Behavior } from '../../eventBus/Behavior';


export class ToolboxActivateBehavior extends Behavior {

    constructor (toolbox) {
        super();
        this.toolbox = toolbox;
    }

    during (event) {
        this.toolbox.activate(event.tool);
    }

}
