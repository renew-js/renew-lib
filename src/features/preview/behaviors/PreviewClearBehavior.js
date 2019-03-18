import { Behavior } from '../../../core/eventBus/Behavior';


export class PreviewClearBehavior extends Behavior {

    constructor (preview) {
        super();
        this.preview = preview;
    }

    during (event) {
        this.preview.clearVisuals();
    }

}
