import { Behavior } from '../../../core/eventBus/Behavior';


export class SimulationTerminateBehavior extends Behavior {

    constructor (externalSimulation) {
        super();
        this.externalSimulation = externalSimulation;
    }

    during (event) {
        this.externalSimulation.terminate();
    }

}
