import { Behavior } from '../../../core/eventBus/Behavior';


export class StartSimulationBehavior extends Behavior {

    constructor (externalSimulation) {
        super();
        this.externalSimulation = externalSimulation;
    }

    during (event) {
        this.externalSimulation.init(event.formalismId);
    }

}
