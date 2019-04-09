import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';


export class TextRenderer extends BaseRenderer {

    constructor (eventBus, canvas, style) {
        super(eventBus, 10);
        this.canvas = canvas;
        this.style = style;
    }

    canRender (element) {
        console.log('canRender', element);
        return element.type === 'label';
    }

    drawShape (graphics, element) {
        console.log('drawShape', element);
    }

}
