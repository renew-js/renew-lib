import { translate } from 'diagram-js/lib/util/SvgTransformUtil';
import { append, attr, create, clone, remove } from 'tiny-svg';
import { Behavior } from '../../../core/eventBus/Behavior';


export class MovePreviewBehavior extends Behavior {

    constructor (eventBus, canvas, styles, elementRegistry) {
        super();
        this.eventBus = eventBus;
        this.preview = null;
        this.canvas = canvas;
        this.styles = styles;
        this.elementRegistry = elementRegistry;
        this.snapContext = null;
    }

    before (event) {
        if (!this.preview) {
            this.preview = this._createVisuals(event);
            event.context = {
                shape: this.preview,
            };
            this.eventBus.fire('shape.move.start', event);
            this.snapContext = event.context.snapContext;
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
        if (this.preview && event.dx && event.dy) {
            event.context = {
                shape: this.preview,
                target: event.hover,
                snapContext: this.snapContext,
            };
            this.eventBus.fire('shape.move.move', event);
            translate(
                this.preview,
                event.x - (event.hoverStart.x + event.hoverStart.width / 2),
                event.y - (event.hoverStart.y + event.hoverStart.height / 2)
            );
        }
    }

    clear (event) {
        event.dx = event.x - (event.hoverStart.x + event.hoverStart.width / 2);
        event.dy = event.y - (event.hoverStart.y + event.hoverStart.height / 2);
        if (this.preview) {
            this.eventBus.fire('shape.move.cleanup', event);
            remove(this.preview);
            this.preview = null;
        }
    }

}
