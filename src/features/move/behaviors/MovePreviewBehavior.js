import { Behavior } from '../../../core/eventBus/Behavior';


export class MovePreviewBehavior extends Behavior {

    constructor (preview) {
        super();
        this.preview = preview;
    }

    before (event) {
        if (!this.preview.visuals) {
            this.preview.createVisuals(event.elements);
        }
    }

    during (event) {
        this.preview.moveTo(
            event.hoverStart.x + event.dx,
            event.hoverStart.y + event.dy
        );
    }

    clear (event) {
        this.preview.clearVisuals();
    }

}
