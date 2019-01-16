import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';


/**
 *
 */
export default class SvgRenderer extends BaseRenderer {
    /**
     * @param {Object} eventBus
     * @param {Number} renderPriority
     */
    constructor (eventBus, renderPriority) {
        super(eventBus, renderPriority);
    }

    canRender () { }

    drawShape () { }

    getShapePath () { }
}
