import { Behavior } from '../../../core/eventBus/Behavior';


export class LassoBehavior extends Behavior {

    constructor (lassoTool, canvas) {
        super();
        this.canvas = canvas;
        this.lassoTool = lassoTool;
    }

    during (context) {
        if (context.root) {
            this.lassoTool.activateLasso(context.originalEvent);
        }
    }

}
