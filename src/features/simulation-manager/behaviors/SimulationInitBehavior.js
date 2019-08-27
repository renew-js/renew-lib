import { Behavior } from '../../../core/eventBus/Behavior';


export class SimulationInitBehavior extends Behavior {

    constructor (simulationManager) {
        super();
        this.simulationManager = simulationManager;
    }

    during (event) {
        this.simulationManager.initSimulation(event.formalismId);
    }

}
