import { Behavior } from '../../eventBus/Behavior';


export class ToolManagerBehavior extends Behavior {

    constructor (toolbox) {
        super();
        this.toolbox = toolbox;
    }

    after (event) {
        this.toolbox.activate(event.tool);
    }

}
