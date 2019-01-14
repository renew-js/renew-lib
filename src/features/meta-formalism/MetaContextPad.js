/**
 *
 */
export class MetaContextPad {
    /**
     * @param {Object} connect
     * @param {Object} contextPad
     * @param {Object} modeling
     */
    constructor (connect, contextPad, modeling) {
        this.connect = connect;
        this.contextPad = contextPad;
        this.modeling = modeling;
    }

    /**
     * @param {Object} element
     */
    getContextPadEntries (element) {

    }

    /**
     * @param {Plugin} plugin
     */
    addFormalism (plugin) {
        this.metamodel = plugin.getMetaModel();
        this.stylesheet = plugin.getStylesheet();
        this.toolConfiguration = plugin.getToolConfiguration();

        this.contextPad.registerProvider(this);
    }
}
