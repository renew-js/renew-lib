export class MetaPluginManager {
    constructor (eventBus) {
        this.plugins = { };
        this.eventBus = eventBus;
    }

    register (plugin) {
        this.plugins[plugin.type] = plugin;
        this.eventBus.fire('plugin.registered', { plugin: plugin });
    }

    getPlugin (model) {
        return this.plugins[model];
    }

    getMetaModel (model) {
        return this.getPlugin(model).getMetaModel();
    }

    getMetaModelElement (model, type) {
        return this.getMetaModel(model).getElement(type);
    }

    getStyleSheet (model) {
        return this.getPlugin(model).getStyleSheet();
    }

    getStyleSheetStyle (model, type) {
        return this.getStyleSheet(model).getStyle(type);
    }

    getToolConfiguration (model) {
        return this.getPlugin(model).getToolConfiguration();
    }

    getToolConfigurationMapping (model, type) {
        return this.getToolConfiguration(model).toolMappings[type];
    }

    getToolConfigurationContextMapping (model, type) {
        return this.getToolConfiguration(model).toolMappings[type];
    }
}
