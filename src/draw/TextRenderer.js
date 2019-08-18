import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';
import { append, classes, create, innerSVG, attr } from 'tiny-svg';
import TextUtils from 'diagram-js/lib/util/Text';


export class TextRenderer extends BaseRenderer {

    constructor (eventBus, canvas) {
        super(eventBus, 10);
        this.canvas = canvas;
        this.textUtils = new TextUtils();
        this.addFont();
    }

    addFont () {
        const fontStyle = create('style', { type: 'text/css' });
        innerSVG(fontStyle, '@import url(\'https://fonts.googleapis.com/css?' +
            'family=Noto+Sans:400,400i,700,700i|Source+Code+Pro:400,600\');');
        append(this.canvas._defs, fontStyle);
    }

    canRender (element) {
        return element.type === 'label';
    }

    drawShape (graphics, element) {
        const options = element.options || { };
        options.box = options.bounds;
        const text = this.textUtils.createText(element.text, options);
        attr(text, { 'font-family': '\'Noto Sans\', sans-serif' });
        classes(text).add('djs-label');
        append(graphics, text);
        return text;
    }

}
