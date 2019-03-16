import { append, attr, create } from 'tiny-svg';
import { Behavior } from '../../../core/eventBus/Behavior';


export class MovePreviewBehavior extends Behavior {

    constructor () {
        super();
        this.preview = null;
    }

    before (event) {
        if (!this.preview) {
            this.preview = this._createVisuals(event.elements);
        }
    }

    _createVisuals (context) {
        return null;
    }

    during (event) {
        // TODO: handle move preview
    }

}
