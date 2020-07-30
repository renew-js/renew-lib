import CommandHandler from 'diagram-js/lib/command/CommandHandler';


/**
 * @abstract
 */
export class Command extends CommandHandler {

    constructor () {
        super();
    }

    /**
     * @param {Object} context
     * @return {Boolean}
     */
    canExecute (context) {

        return true;
    }

    /**
     * @param {Object} context
     */
    preExecute (context) {
    }

    /**
     * @abstract
     * @param {Object} context
     */
    execute (context) {
    }

    /**
     * @abstract
     * @param {Object} context
     */
    revert (context) {
    }

    /**
     * @param {Object} context
     */
    postExecute (context) {
    }

}
