import RuleProvider from 'diagram-js/lib/features/rules/RuleProvider';


/**
 *
 */
export class MetaRules extends RuleProvider {
    /**
     * @param  {object} eventBus
     */
    constructor (eventBus) {
        super(eventBus);
    }
    /**
     * @param {Plugin} plugin
     */
    addFormalism (plugin) {
        this.metamodel = plugin.getMetaModel();
        this.stylesheet = plugin.getStylesheet();
        this.toolConfiguration = plugin.getToolConfiguration();
    }
}
