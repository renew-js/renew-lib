import { Behavior } from '../../../core/eventBus/Behavior';


export class PreviewInitBehavior extends Behavior {

    constructor (preview) {
        super();
        this.preview = preview;
    }

    during (event) {
        if (!this.preview.visuals) {
            this.preview.createVisuals(event.elements);
        }
    }

}
