import Viewer from './Viewer';
import BaseShapesModule from './features/base-shapes';
import BaseToolsModule from './features/base-tools';
import MetaFormalismModule from './features/meta-formalism';
import DrawModule from './draw';


/**
 *
 */
export default class Simulator extends Viewer {
    /**
     * @param {string} id
     */
    constructor (id) {
        super({
            modules: [
                // DrawModule,
                // BaseToolsModule, // basic editor tools
                // SimulationModule,
                // MetaSimulationModule,
            ],
        });
    }

    resetSimulation () {

    }

    stepSimulation () {

    }
}
