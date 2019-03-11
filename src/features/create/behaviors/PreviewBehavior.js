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
        if (!this.create.preview && this.canPreview(context)) {
            this.create.preview = this.createPreview(this.create.factory);
        }
    }

    createPreview (factory) {
        const shape = factory.createElement(this.create.config.type);

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

    canPreview (context) {
        return this.policy.allowed('shape.preview', context);
    }

    clearPreview () {
        if (this.create.preview) {
            this.create.clearPreview();
        }
    }

    during (context) {
        if (this.canPreview(context)) {
            translate(
                this.create.preview,
                context.sx || context.x,
                context.sy || context.y
            );
        } else {
            this.clearPreview();
        }
    }


}
