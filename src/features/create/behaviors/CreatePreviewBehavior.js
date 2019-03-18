import { Behavior } from '../../../core/eventBus/Behavior';


export class CreatePreviewBehavior extends Behavior {

    constructor (eventBus, create, canvas, policy) {
        super();
        this.eventBus = eventBus;
        this.policy = policy;

        this.create = create;

        this.canvas = canvas;

        this.element = null;
    }

    before (event) {
        if (!this.element) {
            this.element = this.create.createElement();
            this.eventBus.fire('preview.init', { elements: this.element });
        }
    }

    during (event) {
        this.eventBus.fire('preview.move.to', {
            x: (event.sx || event.x) - this.element.width / 2,
            y: (event.sy || event.y) - this.element.height / 2
        });
    }

    after (event) {
        if (this.policy.allowed('create.element', { })) {
            this._setMarker(event.hover, 'new-parent');
        } else {
            this._setMarker(event.hover, 'drop-not-ok');
        }
    }

    clear (event) {
        this.eventBus.fire('preview.clear');
        this.element = null;
        this.out(event);
    }

    out (event) {
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
