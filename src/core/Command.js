import CommandHandler from 'diagram-js/lib/command/CommandHandler';


/**
 * @abstract
 */
export class Command extends CommandHandler() {

    constructor () {
        super();
    }

    /**
     * @abstract
     * @param {Object} context
     */
    preExecute (context) { }

    /**
     * @abstract
     * @param {Object} context
     */
    execute (context) { }

    /**
     * @abstract
     * @param {Object} context
     */
    revert (context) { }

    /**
     * @abstract
     * @param {Object} context
     */
    postExecute (context) { }

}
