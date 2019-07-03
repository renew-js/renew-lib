import Client from 'renew-simulator-client';

export class ExternalSimulation {

    constructor (
        eventBus,
        simulationManager,
        metaPluginManager,
        metaFactory,
        elementRegistry,
        canvas
    ) {
        this.eventBus = eventBus;
        this.simulationManager = simulationManager;
        this.metaPluginManager = metaPluginManager;
        this.metaFactory = metaFactory;
        this.elementRegistry = elementRegistry;
        this.canvas = canvas;

        this.formalisms = [];
        this.activeFormalism = null;
        this.client = new Client();

        this.registerHandlers();
    }

    registerHandlers () {
        this.client
            .on('disconnect', () => {
                this.formalisms.forEach((formalismId) => {
                    this.simulationManager.deleteFormalism(formalismId);
                });
            })
            .on('plugin.list', (plugins) => {
                this.formalisms = [];
                plugins.forEach((plugin) => {
                    plugin.provides.forEach((formalism) => {
                        const externalFormalism = {
                            plugin: plugin.name,
                            id: formalism.id,
                            name: formalism.name,
                            metaModel: formalism.metaModel,
                        };
                        this.simulationManager.addFormalism(externalFormalism);
                        this.formalisms.push(formalism.id);
                    });
                });
            })
            .on('simulation.error', (error) => {
                // TODO Use Statusbar for this
                console.error('External simulation error:', error);
            })
            .on('remove.label', (labelData) => {
                this.removeLabel(labelData);
            })
            .on('create.label', (labelData) => {
                this.createLabel(labelData);
            });
    }

    getSerializedData (data, model, format) {
        data.title = +(new Date());

        const plugin = this.metaPluginManager.getPlugin(model);
        const serializer = plugin.getSerializer(format);

        if (!serializer) {
            return;
        }

        return serializer.serialize(data);
    }

    init (formalismId, netInstance) {
        if (!this.formalisms.includes(formalismId)) {
            return;
        }

        this.activeFormalism = this.simulationManager.activeFormalism;

        const serializedData = this.getSerializedData(
            netInstance,
            this.activeFormalism.metaModel.type,
            this.activeFormalism.metaModel.format
        );

        this.client.initSimulation(
            this.activeFormalism,
            netInstance,
            serializedData
        );
        this.step();
    }

    step () {
        this.client.step(this.activeFormalism);
    }

    stop () {

    }

    terminate () {
        this.client.terminate(this.activeFormalism);
        this.activeFormalism = null;
    }

    createLabel (labelData) {
        const parent = this.elementRegistry.get(labelData.parentId);
        const label = this.metaFactory.createElement(labelData.type);

        label.width = 150; // TODO get default dimensions from somewhere
        label.height = 50;

        label.x = parent.x || 0;
        label.x -= (label.width - (parent.width || 0)) / 2;
        label.y = parent.y || 0;
        label.y -= (label.height - (parent.height || 0)) / 2;
        label.text = labelData.text + '';

        parent.labels.add(label);
        this.canvas.addShape(label, parent);
    }

    removeLabel (labelData) {
        const parent = this.elementRegistry.get(labelData.parentId);

        parent.labels.forEach((label) => {
            if (label.metaObject
                && label.metaObject.type === labelData.type) {
                this.canvas.removeShape(label);
            }
        });
    }

}
