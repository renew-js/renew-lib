import { mid } from 'diagram-js/lib/features/snapping/SnapUtil';
import { append, attr, create, remove } from 'tiny-svg';

import { Behavior } from '../../../core/eventBus/Behavior';


export class ConnectPreviewBehavior extends Behavior {

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
        let source = { x: event.sx, y: event.sy };
        let target = { x: event.x, y: event.y };
        if (event.hoverStart.type === 'shape') {
            source = mid(event.hoverStart);
        }
        if (event.hover.type === 'shape'
            && event.hoverStart.id !== event.hover.id) {
            target = mid(event.hover);
        }
        attr(this.preview, {
            'points': [
                source.x,
                source.y,
                target.x,
                target.y,
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
