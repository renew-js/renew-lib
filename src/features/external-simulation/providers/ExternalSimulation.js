import io from 'socket.io-client';

export class ExternalSimulation {

    constructor (simulationManager) {
        this.simulationManager = simulationManager;
        this.simulators = [];
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
            this.simulators.forEach((simulatorId) => {
                this.simulationManager.deleteSimulator(simulatorId);
            });
        });

        this.socket.on('plugin.list', (plugins) => {
            this.simulators = [];
            plugins.forEach((plugin) => {
                plugin.provides.forEach((simulator) => {
                    const externalSimulator = {
                        type: 'external',
                        plugin: plugin.name,
                        id: simulator.id,
                        name: simulator.name,
                    };
                    this.simulationManager.addSimulator(externalSimulator);
                    this.simulators.push(simulator.id);
                });
            });
        });
    }

}
