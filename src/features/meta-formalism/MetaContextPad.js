export class MetaContextPad {
    constructor (contextPad, eventBus) {
        this.contextPad = contextPad;
        this.eventBus = eventBus;

        this.eventBus.on('plugin.registered', (event) => {
            this.registerPlugin(event.plugin);
            this.contextPad.registerProvider(this);
        });
    }

    registerPlugin (plugin) {

    }

    getContextPadEntries (element) {
        return ;
    }
}
