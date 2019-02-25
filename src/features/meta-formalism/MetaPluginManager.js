export class MetaPluginManager {
    constructor (eventBus) {
        this.plugins = { };
        this.eventBus = eventBus;
    }

    register (plugin) {
        this.plugins[plugin.type] = plugin;
        this.eventBus.fire('plugin.registered', { plugin: plugin });
    }

    getPlugin (type) {
        return this.plugins[type];
    }
}
