import { append, attr, create, remove } from 'tiny-svg';

import { Behavior } from '../../../core/eventBus/Behavior';


export class PreviewBehavior extends Behavior {

    constructor (canvas) {
        super();
        this.canvas = canvas;
        this.preview = null;
    }

    before (context) {
        if (!this.preview) {
            this.preview = this._createPreview(context);
        }
    }

    during (context) {
        console.log(context.type);
        attr(this.preview, {
            'points': [
                context.sx,
                context.sy,
                context.x,
                context.y,
            ],
        });
    }

    clear (context) {
        console.log(context, this.preview);
        if (this.preview) {
            remove(this.preview);
            this.preview = null;
        }
    }

    _createPreview (context) {
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
