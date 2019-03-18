import { Behavior } from '../../../core/eventBus/Behavior';


export class PreviewMoveBehavior extends Behavior {

    constructor (preview) {
        super();
        this.preview = preview;
    }

    by (event) {
        this.preview.moveBy(event.dx, event.dy);
    }

    to (event) {
        this.preview.moveTo(event.x, event.y);
    }

}
