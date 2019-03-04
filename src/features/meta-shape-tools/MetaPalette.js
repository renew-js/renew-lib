export class MetaPalette {

    constructor (eventBus, toolbox) {
        this.metaPaletteEntries = {};

        this.eventBus = eventBus;
        this.toolbox = toolbox;
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
                click: (event) => {
                    this.toolbox.activate('create', entry);
//                        click: event,
//                        plugin: plugin,
//                        element: entry,
                },
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
