import RuleProvider from 'diagram-js/lib/features/rules/RuleProvider';


export class MetaRules extends RuleProvider {

    constructor (eventBus) {
        super(eventBus);

        eventBus.on('plugin.register.end', (event) => {
            this.registerPlugin(event.plugin);
        });
    }

    /**
     * Register Plugin related rules
     * @param {Plugin} plugin
     */
    registerPlugin (plugin) {

    }

    /**
     * Initialize ubiquitous rules
     */
    init () {
        this.addRule('connection.reconnectStart', function (context) {
            // console.log('reconnectStart', context);
            return true;
        });
        this.addRule('connection.reconnectEnd', function (context) {
            // console.log('reconnectEnd', context);
            return true;
        });

        this.addRule('shape.resize', (context) => {
            return context.shape.resizable;
        });
    }

}
