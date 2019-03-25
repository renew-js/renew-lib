import { Behavior } from '../../../core/eventBus/Behavior';


export class CreateMarkerBehavior extends Behavior {

    constructor (policy, canvas) {
        super();
        this.policy = policy;
        this.canvas = canvas;
    }

    update (event) {
        if (this.policy.allowed('create.element', { })) {
            this._setMarker(event.hover, 'new-parent');
        } else {
            this._setMarker(event.hover, 'drop-not-ok');
        }
    }

    out (event) {
        this.clear(event);
    }

    clear (event) {
        if (event.hover) {
            this._setMarker(event.hover);
        }
    }

    _setMarker (element, name) {
        const markers = [ 'new-parent', 'drop-not-ok' ];
        markers.forEach((marker) => {
            if (name === marker) {
                this.canvas.addMarker(element, marker);
            } else {
                this.canvas.removeMarker(element, marker);
            }
        });
    }

}
