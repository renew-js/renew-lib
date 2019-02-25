export class MetaPluginManager {
    constructor (eventBus) {
        this.plugins = [];
        this.eventBus = eventBus;
    }

    register (plugin) {
        this.plugins.push(plugin);
        this.eventBus.fire('plugin.registered', { plugin: plugin });
    }
}
