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

    /*
    addMetaConnection (connection) {
        connection.type = this.getConnectionType(
            connection.source, connection.target);
        if (connection.type) {
            connection.arrowStart = null;
        }
    }

    getConnectionType (source, target) {
        const srcModelType = source.type.split(':')[0];
        const srcType = source.type.split(':')[1];
        const targetType = target.type.split(':')[1];

        let result = null;

        const relations = this.metaPlugin.metamodels[srcModelType].relations;
        relations.forEach((relation) => {
            relation.bind[srcType].forEach((bindable) => {
                console.log(bindable, targetType);
                if (bindable === '*' || bindable === targetType) {
                    result = relation.type;
                }
            });
        });

        return result;
    }
    */
}
