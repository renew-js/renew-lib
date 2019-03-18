import { append, attr, create, remove } from 'tiny-svg';
import { Behavior } from '../../../core/eventBus/Behavior';


export class RubberBandPreviewBehavior extends Behavior {

    constructor (canvas, rubberBand) {
        super();
        this.canvas = canvas;
        this.rubberBand = rubberBand;
        this.preview = null;
    }

    before (event) {
        if (!this.preview) {
            this.preview = this._createPreview();
        }
    }

    during (event) {
        this.rubberBand.rect = {
            x: Math.min(event.sx, event.x),
            y: Math.min(event.sy, event.y),
            width: Math.abs(event.x - event.sx),
            height: Math.abs(event.y - event.sy),
        };
    }

    after (event) {
        if (this.preview) {
            attr(this.preview, this.rubberBand.rect);
        }
    }

    clear () {
        if (this.preview) {
            remove(this.preview);
            this.preview = null;
        }
    }

    _createPreview () {
        const visuals = create('rect');

        attr(visuals, { class: 'djs-lasso-overlay', width: 1, height: 1, x: 0, y: 0 });

        append(this.canvas.getDefaultLayer(), visuals);

        return visuals;
    }

}
