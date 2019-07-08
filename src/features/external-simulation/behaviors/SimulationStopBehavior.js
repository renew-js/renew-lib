import { Behavior } from '../../../core/eventBus/Behavior';


export class SimulationStopBehavior extends Behavior {

    constructor (externalSimulation) {
        super();
        this.externalSimulation = externalSimulation;
    }

    during (event) {
        this.externalSimulation.stop();
    }

}
