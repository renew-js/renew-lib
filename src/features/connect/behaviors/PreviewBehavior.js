import { append, attr, create, remove } from 'tiny-svg';

import { Behavior } from '../../../core/eventBus/Behavior';


export class PreviewBehavior extends Behavior {

    constructor (canvas) {
        super();
        this.canvas = canvas;
        this.preview = null;
    }

    before (event) {
        if (!this.preview) {
            this.preview = this._createPreview(event);
        }
    }

    during (event) {
        attr(this.preview, {
            'points': [
                event.sx,
                event.sy,
                event.x,
                event.y,
            ],
        });
    }

    clear (event) {
        if (this.preview) {
            remove(this.preview);
            this.preview = null;
        }
    }

    _createPreview (event) {
        const visual = create('polyline');

        attr(visual, {
            'stroke': '#333',
            'strokeDasharray': [ 1 ],
            'strokeWidth': 2,
            'pointer-events': 'none',
        });

        append(this.canvas.getDefaultLayer(), visual);

        return visual;
    }

}
