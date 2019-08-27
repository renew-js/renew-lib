import { Behavior } from '../../../core/eventBus/Behavior';


export class SimulationInitBehavior extends Behavior {

    constructor (externalSimulation) {
        super();
        this.externalSimulation = externalSimulation;
    }

    during (event) {
        this.externalSimulation.init(event.formalismId, event.data);
    }

}
