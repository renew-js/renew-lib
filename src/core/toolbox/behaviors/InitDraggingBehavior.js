import { Behavior } from '../../eventBus/Behavior';


export class InitDraggingBehavior extends Behavior {
    constructor (toolbox) {
        super();
        this.toolbox = toolbox;
    }

    before (event) {
        this.toolbox.activate();
    }
}
