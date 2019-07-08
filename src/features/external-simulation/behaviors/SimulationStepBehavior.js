import { Behavior } from '../../../core/eventBus/Behavior';


export class SimulationStepBehavior extends Behavior {

    constructor (externalSimulation) {
        super();
        this.externalSimulation = externalSimulation;
    }

    during (event) {
        this.externalSimulation.step();
    }

}
