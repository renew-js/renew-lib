import { translate } from 'diagram-js/lib/util/SvgTransformUtil';
import { append, attr, create, clone, remove } from 'tiny-svg';
import { Behavior } from '../../../core/eventBus/Behavior';


export class MovePreviewBehavior extends Behavior {

    constructor (canvas, styles, elementRegistry) {
        super();
        this.preview = null;
        this.canvas = canvas;
        this.styles = styles;
        this.elementRegistry = elementRegistry;
    }

    before (event) {
        if (!this.preview) {
            this.preview = this._createVisuals(event);
        }
    }

    _createVisuals (event) {
        const group = create('g');
        attr(group, this.styles.cls('djs-drag-group', [ 'no-events' ]));

        event.elements.forEach((element) => {
            const shape = clone(this.elementRegistry.getGraphics(element.id));

            attr(shape, this.styles.cls('djs-dragger', []));

            append(group, shape);
        });

        append(this.canvas.getDefaultLayer(), group);
        return group;
    }

    during (event) {
        if (this.preview) {
            translate(this.preview, event.dx, event.dy);
        }
    }

    clear (event) {
        if (this.preview) {
            remove(this.preview);
            this.preview = null;
        }
    }

}
