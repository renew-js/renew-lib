/**
 * @abstract
 */
export class Behavior {

    /**
     * @abstract
     * @param {Object} context
     */
    before (context) { }

    /**
     * @abstract
     * @param {Object} context
     */
    during (context) { }

    /**
     * @abstract
     * @param {Object} context
     */
    after (context) { }

}

