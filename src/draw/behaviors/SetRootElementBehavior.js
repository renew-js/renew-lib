import { Behavior } from '../../core/eventBus/Behavior';


export class SetRootElementBehavior extends Behavior {

    constructor (canvas) {
        super();
        this.canvas = canvas;
    }

    during (context) {
        this.canvas.getRootElement();
    }

}
