import { translate } from 'diagram-js/lib/util/SvgTransformUtil';
import { append, classes, clone, create, remove } from 'tiny-svg';


export class PreviewProvider {

    constructor (canvas) {
        this.canvas = canvas;

        this.visuals = null;
    }

    createVisuals (elements) {
        elements = Array.isArray(elements) ? elements : [ elements ];

        this.clearVisuals();

        this.visuals = create('g', { opacity: 0.6 });

        // hijack renderer to draw preview
        const elementRegistry = this.canvas._elementRegistry;
        const graphicsFactory = this.canvas._graphicsFactory;

        elements.forEach((element) => {
            const graphics = elementRegistry.getGraphics(element.id);
            let visual;

            if (!graphics) {
                visual = create('g', { id: element.id + '-preview', });
                classes(visual).add('djs-visual');
            } else {
                visual = clone(graphics);
            }

            switch (element.type) {
                case 'shape':
                    graphicsFactory.drawShape(visual, element);
                    this.visuals.x = element.x || 0;
                    this.visuals.y = element.y || 0;
                    break;
                case 'connection':
                    graphicsFactory.drawConnection(visual, element);
                    break;
            }

            append(this.visuals, visual);
        });

        append(this.canvas.getDefaultLayer(), this.visuals);

        return this.visuals;
    }

    clearVisuals () {
        if (this.visuals) {
            remove(this.visuals);
            this.visuals = null;
        }
    }

    moveTo (x, y) {
        this.moveBy(x - this.visuals.x, y - this.visuals.y);
    }

    moveBy (dx, dy) {
        if (this.visuals) {
            translate(this.visuals, dx, dy);
        }
    }

}
