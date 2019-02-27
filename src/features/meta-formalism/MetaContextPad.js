export class MetaContextPad {
    constructor (contextPad, metaPluginManager, modeling) {
        this.contextPad = contextPad;
        this.pluginManager = metaPluginManager;
        this.modeling = modeling;

        this.contextPad.registerProvider(this);
    }

    getContextPadEntries (element) {
        const entries = {
            'delete': {
                group: 'edit',
                className: 'context-pad-icon-remove',
                title: 'Remove',
                action: {
                    click: () => this.modeling.removeElements([ element ]),
                },
            },
        };

        const plugin = this.pluginManager.getPlugin(element.model);
        const metaModel = plugin.getMetaModel();

        metaModel.relations.forEach((relation) => {
            const relationEntry = this.getRelationEntry(element, relation);
            if (relationEntry) {
                entries[ relation.type ] = relationEntry;
            }
        });

        metaModel.getElement(element.metaType).labels.forEach((label) => {
            const textEntry = this.getTextEntry(element, label);
            if (textEntry) {
                entries[ label ] = textEntry;
            }
        });

        return entries;
    }

    getRelationEntry (element, relation) {
        const config = this.pluginManager.getToolConfiguration(element.model);
        const mapping = config.contextToolMappings[relation.type];

        if (!mapping || !relation.bind[element.metaType]) {
            return false;
        }

        return {
            group: element.model,
            imageUrl: mapping.icon,
            title: mapping.title,
        }
    }

    getTextEntry (element, label) {
        const plugin = this.pluginManager.getPlugin(element.model);
        const toolConfiguration = plugin.getToolConfiguration();
        const mapping = toolConfiguration.contextToolMappings[label];


        if (!mapping) {
            return false;
        }

        return {
            group: element.model,
            imageUrl: mapping.icon,
            title: mapping.title,
        }
    }
}
