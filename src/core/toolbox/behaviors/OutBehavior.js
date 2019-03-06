import { Behavior } from '../../eventBus/Behavior';


export class OutBehavior extends Behavior {
    constructor (toolbox) {
        super();
        this.toolbox = toolbox;
    }

    during (event) {
        this.toolbox.hover = null;
        this.toolbox.hoverGfx = null;
    }
}
