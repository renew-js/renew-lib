import { Behavior } from '../../../core/eventBus/Behavior';
import { translate } from 'diagram-js/lib/util/SvgTransformUtil';
import { append, attr, classes, create, remove } from 'tiny-svg';


export class PreviewBehavior extends Behavior {

    constructor (eventBus, canvas, styles, graphicsFactory, policy, create) {
        super();
        this.eventBus = eventBus;
        this.policy = policy;
        this.create = create;
        this.canvas = canvas;
        this.styles = styles;
        this.graphicsFactory = graphicsFactory;
        this.snapContext = null;
    }

    before (event) {
        if (!this.create.preview && this.create.factory) {
            this.create.preview = this._createPreview(
                this.create.factory.createElement(this.create.config.type)
            );
            event.context = {
                shape: this.create.preview,
            };
            this.eventBus.fire('create.start', event);
            this.snapContext = event.context.snapContext;
        }
    }

    _createPreview (shape) {
        const group = create('g');
        attr(group, this.styles.cls('djs-drag-group', [ 'no-events' ]));
        append(this.canvas.getDefaultLayer(), group);

        const preview = create('g');
        classes(preview).add('djs-dragger');
        append(group, preview);

        translate(preview, shape.width / -2, shape.height / -2);

        const visualGroup = create('g');
        classes(visualGroup).add('djs-visual');
        append(preview, visualGroup);

        // hijack renderer to draw preview
        this.graphicsFactory.drawShape(visualGroup, shape);

        return group;
    }

    out (event) {
        if (event.hover) {
            this._setMarker(event.hover);
        }
    }

    clear (event) {
        if (this.create.preview) {
            this.eventBus.fire('create.cleanup', event);
            this.create.clearPreview();
            this.out(event);
        }
    }

    during (event) {
        event.context = {
            shape: this.create.preview,
            target: event.hover,
            snapContext: this.snapContext,
        };
        this.eventBus.fire('create.move', event);
        translate(
            this.create.preview,
            event.sx || event.x,
            event.sy || event.y
        );
    }

    after (event) {
        if (this.policy.allowed('create.element', { })) {
            this._setMarker(event.hover, 'new-parent');
        } else {
            this._setMarker(event.hover, 'drop-not-ok');
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
