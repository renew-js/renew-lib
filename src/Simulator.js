import Viewer from './Viewer';
import BaseShapesModule from './features/base-shapes';
import BaseToolsModule from './features/base-tools';
import MetaFormalismModule from './features/meta-formalism';
import DrawModule from './draw';


/**
 *
 */
export default class Simulator extends Viewer {
    constructor (options = {}) {
        super(Object.assign({
            modules: [
                // DrawModule,
                // BaseToolsModule, // basic editor tools
                // SimulationModule,
                // MetaSimulationModule,
            ],
        }, options));
    }

    resetSimulation () {

    }

    stepSimulation () {

    }
}
