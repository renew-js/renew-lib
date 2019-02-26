export class MetaContextPad {
    constructor (contextPad, eventBus, modeling) {
        this.metaContextPadEntries = {};
        
        this.contextPad = contextPad;
        this.eventBus = eventBus;
        this.modeling = modeling;

        this.eventBus.on('plugin.registered', (event) => {
            this.registerPlugin(event.plugin);
            this.contextPad.registerProvider(this);
        });
    }

    getContextPadEntries (element) {
        return {
            'delete': {
                group: 'edit',
                className: 'context-pad-icon-remove',
                title: 'Remove',
                action: {
                    click: () => this.modeling.removeElements([element])
                },
            },
        };
    }

    registerPlugin (plugin) {
        const toolConfiguration = plugin.getToolConfiguration();


    }
}
