import { Behavior } from '../../../core/eventBus/Behavior';
import { translate } from 'diagram-js/lib/util/SvgTransformUtil';
import { append, attr, classes, create, remove } from 'tiny-svg';


export class PreviewBehavior extends Behavior {

    constructor (canvas, styles, graphicsFactory, policy, create) {
        super();
        this.policy = policy;
        this.create = create;
        this.canvas = canvas;
        this.styles = styles;
        this.graphicsFactory = graphicsFactory;
    }

    before (context) {
        if (!this.create.preview && this.create.factory) {
            this.create.preview = this._createPreview(
                this.create.factory.createElement(this.create.config.type)
            );
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
        this._setMarker(event.hover);
    }

    clear (event) {
        if (this.create.preview) {
            this.create.clearPreview();
            this.out(event);
        }
    }

    during (context) {
        translate(
            this.create.preview,
            context.sx || context.x,
            context.sy || context.y
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
