export class MetaContextPad {

    constructor (eventBus, contextPad, metaPluginManager) {
        this.eventBus = eventBus;
        this.contextPad = contextPad;
        this.pluginManager = metaPluginManager;

        this.contextPad.registerProvider(this);
    }

    getContextPadEntries (element) {
        const entries = {
            'delete': {
                group: 'edit',
                className: 'context-pad-icon-remove',
                title: 'Remove ' + element.metaType,
                action: {
                    click: (event, element) => {
                        this.eventBus.fire('remove.elements', {
                            elements: [ element ],
                        });
                    },
                },
            },
        };

        const model = element.metaObject.model;
        const type = element.metaObject.targetType;
        const metaModel = this.pluginManager.getMetaModel(model);

        metaModel.relations.forEach((relation) => {
            if (relation.bind[type]) {
                entries['bind'] = this.getRelationEntry(element, relation);
            }
        });

        metaModel.texts.forEach((text) => {
            if (text.labels) {
                text.labels.forEach((label) => {
                    entries['text' + label] = this.getTextEntry(element, text);
                });
            }
        });

        return entries;
    }

    getRelationEntry (element, relation) {
        const model = element.metaObject.model;
        const config = this.pluginManager.getToolConfiguration(model);
        const mapping = config.contextToolMappings[relation.type];

        if (!mapping) {
            return false;
        }

        return {
            group: element.model,
            imageUrl: mapping.icon,
            title: mapping.title,
            action: {
                click: (event, element) => {
                    console.log('TODO: Create relation', event, element);
                },
            },
        };
    }

    getTextEntry (element, type) {
        const plugin = this.pluginManager.getPlugin(element.model);
        const toolConfiguration = plugin.getToolConfiguration();
        const mapping = toolConfiguration.contextToolMappings[type];


        if (!mapping) {
            return false;
        }

        return {
            group: element.model,
            imageUrl: mapping.icon,
            title: mapping.title,
            action: {
                click: (event, element) => {
                    this.eventBus.fire('contextPad.text.click', {
                        element: element,
                        textType: type,
                    });
                },
            },
        };
    }

}
