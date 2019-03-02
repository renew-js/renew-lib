export class MetaPluginManager {
    constructor (eventBus) {
        this.eventBus = eventBus;

        this.plugins = { };

        this.eventBus.on('plugin.register.start', (event) => {
            this.register(event.plugin);
        });
    }

    register (plugin) {
        this.plugins[plugin.type] = plugin;
        this.eventBus.fire('plugin.register.end', { plugin: plugin });
    }

    getPlugin (model) {
        return this.plugins[model];
    }

    getElement (type) {
        const [model, metaType] = type.split(':');
        return this.getMetaModelElement(model, metaType);
    }

    getMetaModel (model) {
        return this.getPlugin(model).getMetaModel();
    }

    getMetaModelElement (model, type) {
        return this.getMetaModel(model).getElement(type);
    }

    getStyle (type) {
        const [model, metaType] = type.split(':');
        return this.getStyleSheetStyle(model, metaType);
    }

    getStylesheet (model) {
        return this.getPlugin(model).getStylesheet();
    }

    getStyleSheetStyle (model, type) {
        return this.getStylesheet(model).getStyle(type);
    }

    getMapping (type) {
        const [model, metaType] = type.split(':');
        return this.getToolConfigurationMapping(model, metaType);
    }

    getToolConfiguration (model) {
        return this.getPlugin(model).getToolConfiguration();
    }

    getToolConfigurationMapping (model, type) {
        return this.getToolConfiguration(model).toolMappings[type];
    }

    getContextMapping (type) {
        const [model, metaType] = type.split(':');
        return this.getToolConfigurationContextMapping(model, metaType);
    }

    getToolConfigurationContextMapping (model, type) {
        return this.getToolConfiguration(model).toolMappings[type];
    }
}
