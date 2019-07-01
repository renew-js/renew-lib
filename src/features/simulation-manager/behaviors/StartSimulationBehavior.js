import { Behavior } from '../../../core/eventBus/Behavior';


export class StartSimulationBehavior extends Behavior {

    constructor (simulationManager) {
        super();
        this.simulationManager = simulationManager;
    }

    during (event) {
        this.simulationManager.start(event.formalismId);
    }

}
