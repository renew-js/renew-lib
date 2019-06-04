export class SimulationManager {

    constructor (eventBus) {
        this.eventBus = eventBus;
        this.simulators = {};
        this.activeSimulator = null;
    }

    addSimulator (simulator) {
        this.simulators[simulator.id] = simulator;
        this.emitUpdate();
    }

    deleteSimulator (simulatorId) {
        delete this.simulators[simulatorId];
        this.emitUpdate();
    }

    activateSimulator (simulatorId) {
        this.activeSimulator = this.simulators[simulatorId];
    }

    emitUpdate () {
        this.eventBus.fire('simulators.updated', {
            simulators: Object.values(this.simulators),
        });
    }

}
