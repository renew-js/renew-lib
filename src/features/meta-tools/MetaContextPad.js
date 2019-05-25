export class MetaContextPad {

    constructor (
        eventBus,
        contextPad,
        metaPluginManager,
        metaFactory,
        orientation
    ) {
        this.eventBus = eventBus;
        this.contextPad = contextPad;
        this.pluginManager = metaPluginManager;
        this.metaFactory = metaFactory;
        this.orientation = orientation;

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

        if (element.metaObject) {

            const model = element.metaObject.model;
            const type = element.metaObject.targetType;
            const metaModel = this.pluginManager.getMetaModel(model);

            metaModel.relations.forEach((relation) => {
                if (relation.bind[type]) {
                    entries['bind'] = this.getRelationEntry(element, relation);
                }
            });

            metaModel.texts.forEach((metaText) => {
                if (metaText.targets.includes(element.metaObject.targetType)) {
                    const entryName = 'text-' + metaText.type;
                    entries[entryName] = this.getTextEntry(element, metaText);
                }
            });

        }

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

    getTextEntry (element, metaText) {
        const plugin = this.pluginManager.getPlugin(element.metaObject.model);
        const toolConfiguration = plugin.getToolConfiguration();
        const mapping = toolConfiguration.contextToolMappings[metaText.type];

        if (!mapping) {
            return false;
        }

        const style = plugin.getStylesheet().getStyle(metaText.type);
        const orientation = this.orientation.position(
            element,
            style.orientation
        );

        return {
            group: element.model,
            imageUrl: mapping.icon,
            title: mapping.title,
            action: {
                click: (event, element) => {
                    const target = element.labels.find((label) => {
                        return label.metaObject.targetType === metaText.type;
                    });
                    if (target) {
                        this.eventBus.fire('edit.activate', {
                            element: target,
                        });
                    } else {
                        const metaType = plugin.type + ':' + metaText.type;
                        this.metaFactory.setType(metaType);
                        this.eventBus.fire('create.label', {
                            factory: this.metaFactory,
                            parent: element,
                            text: metaText.default,
                            orientation,
                        });
                    }
                },
            },
        };
    }

}
