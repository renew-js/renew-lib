import { Behavior } from '../../../core/eventBus/Behavior';


export class SimulationStartBehavior extends Behavior {

    constructor (externalSimulation) {
        super();
        this.externalSimulation = externalSimulation;
    }

    during (event) {
        this.externalSimulation.init(event.formalismId, event.data);
    }

}
