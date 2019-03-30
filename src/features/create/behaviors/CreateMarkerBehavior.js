import { Behavior } from '../../../core/eventBus/Behavior';


export class CreateMarkerBehavior extends Behavior {

    constructor (policy, canvas) {
        super();
        this.policy = policy;
        this.canvas = canvas;

        this.marked = [];
    }

    update (event) {
        if (!event.hover) {
            this.clear();
        } else if (this.policy.allowed('create.element', { })) {
            this._setMarker(event.hover, 'new-parent');
            this.marked.push(event.hover);
        } else {
            this._setMarker(event.hover, 'drop-not-ok');
            this.marked.push(event.hover);
        }
    }

    out (event) {
        this.clear(event);
    }

    clear (event) {
        this.marked.forEach((element) => this._setMarker(element));
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
