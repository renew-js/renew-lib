/**
 * @abstract
 */
export class Behavior {

    /**
     * @param {Object} context
     */
    before (context) { }

    /**
     * @abstract
     * @param {Object} context
     */
    during (context) { }

    /**
     * @param {Object} context
     */
    after (context) { }

}

