export class MetaPalette {
    constructor (eventBus, palette) {
        this.metaPaletteEntries = {};

        this.eventBus = eventBus;
        this.palette = palette;

        this.eventBus.on('plugin.registered', (event) => {
            this.registerPlugin(event.plugin);
            this.palette.registerProvider(this);
        });
    }

    getPaletteEntries () {
        return this.metaPaletteEntries;
    }

    registerPlugin (plugin) {
        plugin.getMetaModel().getElements().forEach((element) => {
            const entry = this.createEntry(element, plugin);
            this.metaPaletteEntries[entry.type] = entry;
        });
    }

    createEntry (entry, plugin) {
        const metaModel = plugin.getMetaModel();
        const toolConfiguration = plugin.getToolConfiguration();

        return {
            type: metaModel.type + ':' + entry.type,
            group: metaModel.type,
            action: {
                click: (event) => this.eventBus.fire('metaPalette.create', {
                    click: event,
                    plugin: plugin,
                    element: entry
                }),
            },
            imageUrl: toolConfiguration.toolMappings[entry.type].icon,
            title: toolConfiguration.toolMappings[entry.type].title,
        };
    }

}
