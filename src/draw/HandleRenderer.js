import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';


export class HandleRenderer extends BaseRenderer {

    constructor (eventBus, canvas) {
        super(eventBus, 5);
        this.canvas = canvas;
    }

    canRender (element) {
        return element.type === 'handle';
    }

    drawShape (graphics, element) {
    }

}
