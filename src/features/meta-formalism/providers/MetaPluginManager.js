export class MetaPluginManager {

    constructor (eventBus) {
        this.eventBus = eventBus;

        this.plugins = { };
    }

    register (plugin) {
        this.plugins[plugin.type] = plugin;
    }

    getPlugin (model) {
        return this.plugins[model];
    }

    getElement (type) {
        const [ model, metaType ] = type.split(':');
        return this.getMetaModelElement(model, metaType);
    }

    getMetaModel (model) {
        return this.getPlugin(model).getMetaModel();
    }

    getMetaModelElement (model, type) {
        return this.getMetaModel(model).getElement(type);
    }

    getStyle (type) {
        const [ model, metaType ] = type.split(':');
        return this.getStylesheetStyle(model, metaType);
    }

    getStylesheet (model) {
        return this.getPlugin(model).getStylesheet();
    }

    getStylesheetStyle (model, type) {
        return this.getStylesheet(model).getStyle(type);
    }

    getMapping (type) {
        const [ model, metaType ] = type.split(':');
        return this.getToolConfigurationMapping(model, metaType);
    }

    getToolConfiguration (model) {
        return this.getPlugin(model).getToolConfiguration();
    }

    getToolConfigurationMapping (model, type) {
        return this.getToolConfiguration(model).toolMappings[type];
    }

    getContextMapping (type) {
        const [ model, metaType ] = type.split(':');
        return this.getToolConfigurationContextMapping(model, metaType);
    }

    getToolConfigurationContextMapping (model, type) {
        return this.getToolConfiguration(model).contextToolMappings[type];
    }

    getExport (model, additionalData) {
        return this.getPlugin(model).getExport(additionalData);
    }

}
