import { Behavior } from '../../../core/eventBus/Behavior';


export class CreatePreviewBehavior extends Behavior {

    constructor (create, preview, canvas, policy) {
        super();
        this.policy = policy;

        this.create = create;
        this.preview = preview;

        this.canvas = canvas;

        this.element = null;
    }

    before (event) {
        if (!this.element) {
            this.element = this.create.createElement();
            this.preview.createVisuals(this.element);
        }
    }

    during (event) {
        this.preview.moveTo(
            (event.sx || event.x) - this.element.width / 2,
            (event.sy || event.y) - this.element.height / 2
        );
    }

    after (event) {
        if (this.policy.allowed('create.element', { })) {
            this._setMarker(event.hover, 'new-parent');
        } else {
            this._setMarker(event.hover, 'drop-not-ok');
        }
    }

    clear (event) {
        this.preview.clearVisuals();
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
