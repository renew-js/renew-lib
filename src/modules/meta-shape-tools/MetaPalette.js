export class MetaPalette {

    constructor (eventBus, palette) {
        this.metaPaletteEntries = {};

        this.eventBus = eventBus;
        this.palette = palette;

        this.eventBus.on('plugin.register.end', (event) => {
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
            if (entry) {
                this.metaPaletteEntries[entry.type] = entry;
            }
        });
        this.addSeparator(plugin);
    }

    createEntry (entry, plugin) {
        const metaModel = plugin.getMetaModel();
        const toolConfiguration = plugin.getToolConfiguration();

        if (!toolConfiguration.toolMappings[entry.type]) {
            return null;
        }

        return {
            type: metaModel.type + ':' + entry.type,
            group: metaModel.type,
            action: {
                click: (event) => this.eventBus.fire('metaPalette.create', {
                    click: event,
                    plugin: plugin,
                    element: entry,
                }),
            },
            imageUrl: toolConfiguration.toolMappings[entry.type].icon,
            title: toolConfiguration.toolMappings[entry.type].title,
        };
    }

    addSeparator (plugin) {
        const metaModel = plugin.getMetaModel();
        const name = 'plugin-' + metaModel.type + '-separator';
        this.metaPaletteEntries[name] = {
            group: metaModel.type,
            separator: true,
        };
    }

}
