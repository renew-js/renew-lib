import Client from 'renew-simulator-client';

export class ExternalSimulation {

    constructor (eventBus, simulationManager, metaPluginManager) {
        this.eventBus = eventBus;
        this.simulationManager = simulationManager;
        this.metaPluginManager = metaPluginManager;
        this.formalisms = [];
        this.client = new Client();
        this.registerHandlers();
    }

    registerHandlers () {
        this.client.on('disconnect', () => {
            this.formalisms.forEach((formalismId) => {
                this.simulationManager.deleteFormalism(formalismId);
            });
        });

        this.client.on('plugin.list', (plugins) => {
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
        });
    }

    getSerializedData (model, format) {
        const data = this.simulationManager.getData();
        const plugin = this.metaPluginManager.getPlugin(model);
        const serializer = plugin.getSerializer(format);
        data.title = 'foo';

        return serializer.serialize(data);
    }

    init (formalismId) {
        if (!this.formalisms.includes(formalismId)) {
            return;
        }

        const formalism = this.simulationManager.getFormalism(formalismId);
        const data = this.getSerializedData(
            formalism.metaModel.type,
            formalism.metaModel.format
        );

        this.client.initSimulation(formalism, data.payload);
        this.client.step(formalism);
    }

}
