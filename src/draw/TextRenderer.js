import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';
import { append, classes } from 'tiny-svg';
import TextUtils from 'diagram-js/lib/util/Text';


export class TextRenderer extends BaseRenderer {

    constructor (eventBus, canvas) {
        super(eventBus, 10);
        this.canvas = canvas;
        this.textUtils = new TextUtils();
    }

    canRender (element) {
        return element.type === 'label';
    }

    drawShape (graphics, element) {
        const options = element.options || { };
        const text = this.textUtils.createText(element.text, options);
        classes(text).add('djs-label');
        append(graphics, text);
        return text;
    }

}
