/**
 * @abstract
 */
export class Tool {

    constructor () {

    }

    /**
     * @abstract
     * @param {Object} event
     */
    onMouseDown (event) { }

    /**
     * @abstract
     * @param {Object} event
     */
    onMouseMove (event) { }

    /**
     * @abstract
     * @param {Object} event
     */
    onMouseUp (event) { }

    /**
     * @abstract
     * @param {Object} event
     */
    onEnable (event) { }

    /**
     * @abstract
     * @param {Object} event
     */
    onDisable (event) { }

    /**
     * @param {Object} event
     */
    onHover (event) { }

    /**
     * @param {Object} event
     */
    onOut (event) { }

}
