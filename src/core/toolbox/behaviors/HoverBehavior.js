import { Behavior } from '../../eventBus/Behavior';


export class HoverBehavior extends Behavior {

    constructor (toolbox) {
        super();
        this.toolbox = toolbox;
    }

    during (event) {
        this.toolbox.hover = event.element;
        this.toolbox.hoverGfx = event.gfx;
    }

}
