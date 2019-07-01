import io from 'socket.io-client';

export class ExternalSimulation {

    constructor (simulationManager) {
        this.simulationManager = simulationManager;
        this.formalisms = [];
        this.socket = io('http://localhost:3000/', {
            'path': '/gateway',
        });
        this.registerHandlers();
    }

    registerHandlers () {
        this.socket.on('connect', () => {
            console.log('Simulator gateway connected.');
        });

        this.socket.on('disconnect', () => {
            console.log('Simulator gateway disconnected');
            this.formalisms.forEach((formalismId) => {
                this.simulationManager.deleteFormalism(formalismId);
            });
        });

        this.socket.on('plugin.list', (plugins) => {
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
