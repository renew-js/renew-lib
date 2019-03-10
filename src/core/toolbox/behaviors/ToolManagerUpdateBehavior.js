import { Behavior } from '../../eventBus/Behavior';


export class ToolManagerUpdateBehavior extends Behavior {
    constructor (toolbox) {
        super();
        this.toolbox = toolbox;
    }

    after (event) {
        this.toolbox.activate(event.tool);
    }

}
