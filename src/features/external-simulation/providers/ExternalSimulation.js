import Client from 'renew-simulator-client';

export class ExternalSimulation {

    constructor (simulationManager) {
        this.simulationManager = simulationManager;
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
                        type: 'external',
                        plugin: plugin.name,
                        id: formalism.id,
                        name: formalism.name,
                    };
                    this.simulationManager.addFormalism(externalFormalism);
                    this.formalisms.push(formalism.id);
                });
            });
        });
    }

}
