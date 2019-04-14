export class MetaPalette {

    constructor (eventBus, toolbox, metaFactory) {
        this.metaPaletteEntries = {};

        this.eventBus = eventBus;
        this.toolbox = toolbox;
        this.factory = metaFactory;
    }

    getPaletteEntries () {
        return this.metaPaletteEntries;
    }

    registerPlugin (plugin) {
        const config = plugin.getToolConfiguration();

        config.getToolMappings().forEach((tool) => {
            const type = config.targetModel + ':' + tool.targetType;
            const mapping = Object.assign({}, config, tool, { type: type });
            const entry = type.replace(':', '-');
            this.metaPaletteEntries[entry] = this.createEntry(mapping);
        });

        this.addSeparator(config.targetModel);
    }

    createEntry (config) {
        return {
            type: config.type,
            group: config.targetModel,
            action: {
                click: () => this.activateTool(config),
                dragstart: () => this.activateTool(config),
            },
            imageUrl: config.icon,
            title: config.title,
        };
    }

    activateTool (config) {
        this.factory.setType(config.type);
        const tool = 'create.' + this.factory.getType(config.type);
        this.toolbox.activate(tool, { factory: this.factory });
    }

    addSeparator (type) {
        this.metaPaletteEntries['plugin-' + type + '-separator'] = {
            group: type,
            separator: true,
        };
    }

}
